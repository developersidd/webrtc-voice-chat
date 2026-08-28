import freeice from "freeice";
import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import socketInit from "../socket";
import { SOCKET_EVENTS } from "../socket/socket.events";
import type { User } from "../types";
import useStateWithCallback from "./useStateWithCallback";
//const users = [
//  { id: 5, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=11" },
//  { id: 6, name: "Ivan", avatar: "https://i.pravatar.cc/150?img=14" },
//  { id: 7, name: "Adriana", avatar: "https://i.pravatar.cc/150?img=2" },
//];

const useWebRTC = (roomId: string, user: User) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const connections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // initialize the socket connection
  useEffect(() => {
    console.log("initis socket");
    socketRef.current = socketInit();
  }, []);
  // add new client wrapper
  const addNewClient = (newClient: User, cb?: () => void) => {
    console.log("🚀 ~ newClient:", newClient);
    const lookingFor = clients.find(
      (client: User) => client.id === newClient.id,
    );
    console.log("🚀 ~ lookingFor:", lookingFor);
    if (lookingFor === undefined) {
      console.log("Adding new");
      setClients(
        (existingClients: User[]) => [...existingClients, newClient],
        cb,
      );
    }
  };

  // capture the media stream
  useEffect(() => {
    const startCapture = async () => {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0; // disable your voice duplication
          localElement.srcObject = localMediaStream.current;

          // socket emit room join event
          socketRef.current?.emit(SOCKET_EVENTS.JOIN, {
            roomId,
            user,
          });
        }
      });
    });

    return () => {
      // Leaving the room and cleaning up connections when the component unmounts
      localMediaStream.current?.getTracks().forEach((track) => track.stop());

      socketRef.current?.emit(SOCKET_EVENTS.LEAVE);
    };
  }, []);

  // handle peer connection
  useEffect(() => {
    const handleNewPeer = async ({
      peerId,
      createOffer,
      user: remoteUser,
    }: {
      peerId: string;
      createOffer: boolean;
      user: User;
    }) => {
      console.log("🚀 ~ user:", user);
      // check if we already connected to this user
      if (peerId in connections.current) {
        console.warn(
          `You are already connected with ${peerId} (${remoteUser.fullName})`,
        );
        return;
      }
      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });
      console.log(`adding new `);
      // Handle new ice candidate
      connections.current[peerId].onicecandidate = (e) => {
        socketRef.current?.emit(SOCKET_EVENTS.RELAY_ICE, {
          peerId,
          icecandidate: e.candidate,
        });
      };

      // Handle on track event
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          const userId = remoteUser.id;
          if (audioElements.current[userId]) {
            audioElements.current[userId]!.srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[userId]) {
                audioElements.current[userId]!.srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // Add local track to remote connections
      localMediaStream.current?.getAudioTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current!);
      });
      // create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        //
        console.log("sending offer to the server");
        // send offer to the server
        socketRef.current?.emit(SOCKET_EVENTS.RELAY_SDP, {
          sessionDescription: offer,
          peerId,
        });
      }
    };

    socketRef.current?.on(SOCKET_EVENTS.ADD_PEER, handleNewPeer);

    return () => {
      socketRef.current?.off(SOCKET_EVENTS.ADD_PEER);
    };
  }, []);

  // Handle ice candidate
  useEffect(() => {
    socketRef.current?.on(
      SOCKET_EVENTS.ICE_CANDIDATE,
      ({ peerId, icecandidate }) => {
        if (icecandidate) {
          connections.current[peerId].addIceCandidate(icecandidate); // this is the ice candidate from the other peer
        }
      },
    );
    return () => {
      socketRef.current?.off(SOCKET_EVENTS.ICE_CANDIDATE);
    };
  }, []);

  // Handle session description
  useEffect(() => {
    const handleRemoteSdp = async ({
      peerId,
      sessionDescription: remoteDescription,
    }: {
      peerId: string;
      sessionDescription: RTCSessionDescriptionInit;
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteDescription),
      );
      // if session description is type of offer then create an answer
      if (remoteDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);
        socketRef.current?.emit(SOCKET_EVENTS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socketRef.current?.on(SOCKET_EVENTS.SESSION_DESCRIPTION, handleRemoteSdp);
    return () => {
      socketRef.current?.off(
        SOCKET_EVENTS.SESSION_DESCRIPTION,
        handleRemoteSdp,
      );
    };
  }, []);

  // Handle remove peer
  useEffect(() => {
    const handleRemovePeer = ({
      peerId,
      userId,
    }: {
      peerId: string;
      userId: string;
    }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        delete audioElements.current[peerId];
        setClients((list: User[]) => list.filter((c) => c.id !== userId));
      }
    };
    socketRef.current?.on(SOCKET_EVENTS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socketRef.current?.off(SOCKET_EVENTS.REMOVE_PEER, handleRemovePeer);
    };
  }, []);

  // provide auth elements
  const provideAudioRef = (id: string, node: HTMLAudioElement | null) => {
    audioElements.current[id] = node;
  };

  return { clients, setClients, provideAudioRef } as const;
};

export default useWebRTC;

import freeice from "freeice";
import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import socketInit from "../socket";
import { SOCKET_EVENTS } from "../socket/socket.events";
import type { User } from "../types";
import useStateWithCallback from "./useStateWithCallback";
const users = [
  { id: 5, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 6, name: "Ivan", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: 7, name: "Adriana", avatar: "https://i.pravatar.cc/150?img=2" },
];

const useWebRTC = (roomId: string, user: User) => {
  const [clients, setClients] = useStateWithCallback(users);
  const audioElements = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const connections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // initialize the socket connection
  useEffect(() => {
    socketRef.current = socketInit();
  }, []);
  // add new client wrapper
  const addNewClient = (newClient: User, cb?: () => void) => {
    const lookingFor = clients.find(
      (client: User) => client.id === newClient.id,
    );
    if (lookingFor === undefined) {
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
          socketRef.current?.emit("JOIN", {
            roomId,
            user,
          });
        }
      });
    });
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
        //await connections.current[peerId].setLocalDescription(offer);
        //
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

  // provide auth elements
  const provideAudioRef = (id: string, node: HTMLAudioElement | null) => {
    audioElements.current[id] = node;
  };

  return { clients, setClients, provideAudioRef } as const;
};

export default useWebRTC;

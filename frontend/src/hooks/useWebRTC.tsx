import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import socketInit from "../socket";
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
   socketRef.current =  socketInit()
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

          // socket emit join room event
          socketRef.current?.emit("JOIN", {
            roomId,
            user,
          })
        }
      });
    });
  }, []);

  // provide auth elements
  const provideAudioRef = (id: string, node: HTMLAudioElement | null) => {
    audioElements.current[id] = node;
  };

  return { clients, setClients, provideAudioRef } as const;
};

export default useWebRTC;

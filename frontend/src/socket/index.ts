import { io } from "socket.io-client";

const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(import.meta.env.VITE_SOCKET_URL, options);
};

export default socketInit;

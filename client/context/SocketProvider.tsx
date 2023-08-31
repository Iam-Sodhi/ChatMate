"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });



    socketInstance.on("room:join", (data: { room: string; email: string }) => {
      // Handle user joining room
      // Broadcast to other users in the same room
      console.log(`User joined room: ${data.room}, email: ${data.email}`);
    });

    socketInstance.on("user:call", (data: { to: string; offer: any }) => {
      // Handle user call event
      console.log("Received call from", data.to);
      // Emit an event back if needed
    });

    socketInstance.on("call:accepted", (data: { to: string; ans: any }) => {
      // Handle call accepted event
      console.log("Call accepted by", data.to);
    });

    socketInstance.on("peer:nego:needed", (data: { to: string; offer: any }) => {
      // Handle peer negotiation needed event
      console.log("Peer negotiation needed for", data.to);
    });

    socketInstance.on("peer:nego:done", (data: { to: string; ans: any }) => {
      // Handle peer negotiation done event
      console.log("Peer negotiation done with", data.to);
    });


    
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
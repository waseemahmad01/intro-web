import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const webSocket = io(process.env.REACT_APP_API_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
    webSocket.connect();
    setSocket(webSocket);
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user.data);
  useEffect(() => {
    console.log("hello world");

    // socket.emit("message", "hello from intro app");
    // const socket = io(process.env.REACT_APP_API_URL, {
    //   autoConnect: false,
    //   transports: ["websocket"],
    //   jsonp: false,
    // });
    // socket.connect();
    // socket.on("disconnect", user._id);
    // console.log(socket);
    // setSocket(socket);
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

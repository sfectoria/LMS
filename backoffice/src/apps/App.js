import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../layout/NavBar";
import * as React from "react";
import SideBar from "../layout/SideBar";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import MiniDrawer from "../layout/MiniDrawer";
const socket = io("http://localhost:5000"); //path of the server
export const SocketContext = createContext();
function App() {
  const myId = useSelector((state) => state.auth.me?.id);
  // const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    socket.emit("connection", myId); //incide+data
  }, [socket]);

  useEffect(() => {
    socket.on("disconnection", (data) => {
      socket.emit("connection", myId);
    }); //incide+callbackFn
  }, [socket]);

  return (
    <div>
      <SocketContext.Provider value={{ socket }}>
        {/* <NavBar isOpen={isOpen} setIsOpen={setIsOpen} socket={socket} />
         {isOpen && <SideBar setIsOpen={setIsOpen} />} */}
        <MiniDrawer  />
        {/* <div style={{ paddingLeft: isOpen ? 300 : 0, paddingTop: 70 }}> */}
       
      </SocketContext.Provider>
    </div>
  );
}

export default App;

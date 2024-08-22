import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../router/Router";
import { IoNotifications } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";

function NavBar({ isOpen, setIsOpen,socket }) {
  const [notif,setNotif]=useState('')
  const myId=useSelector(state=>state.auth.me?.id)
  useEffect(()=>{
    socket.on('msg-received/'+myId,()=>{
      console.log('wsel');
      setNotif('mgs')
    })
  },[socket])
  const user = useSelector((store) => store.auth.me);
  const navigate = useNavigate();
  return (
    <div
      className={` d-flex ${
        isOpen ? "justify-content-end" : "justify-content-between"
      } align-items-center shadow-sm`}
      style={{
        zIndex: 2,
        backgroundColor: "#F8FAFB",
        position: "fixed",
        width: "100%",
        paddingLeft: isOpen ? 300 : 0,
        height: 70,
      }}
    >
      {/* <div style={{ paddingLeft: isOpen ? 200 : 30 }}>
        <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
          <input
            className="form-control"
            placeholder="Type query"
            aria-label="Search"
            type="Search"
          />
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
      </div> */}
      <div>
        {isOpen !== true && (
          <button
            style={{ color: "#00BAC7", fontSize: "30px" }}
            className="btn btn-light"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        )}
      </div>
      <div></div>
      <div></div>

      <div className="d-flex  align-items-center gap-3 px-4">
        <div
          className="px-3 d-flex align-items-center"
          style={{ color: "#00BAC7", fontSize: "25px" }}
        >
          <div className="px-3">
            <FaMessage />
          </div>
          <div>
            <IoNotifications />{notif}
          </div>
        </div>
        {/* <p className="m-0">Welcome {user.firstName} ✨</p> */}
        <Link to="/profile">
          <img
            src={user.image}
            alt=""
            className="rounded-circle"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        </Link>
        <Button  onClick={()=> {
          localStorage.removeItem("token")
          window.location.pathname="/"
        }}> logout </Button>
      </div>
    </div>
  );

  {
    /* <div className="py-3 , px-5 d-flex align-items-center flex-wrap justify-content-between">
        <div
          className="px-3 py-2 text-white"
          style={{
            backgroundColor: "#00BAC7",
            fontSize: "18px",
            borderRadius: "35%",
          }}
        >
          <FaSearch />
        </div>
        <div className="px-3 ">
          <Form.Control type="text" placeholder="Search" className=" mr-sm-2" />
        </div>
      </div>
      <div>
        <img
          src={user.src}
          alt=""
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div> */
  }
}

export default NavBar;

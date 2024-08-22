import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../assets/logoblanc.png";
import { FaRegCircleDot } from "react-icons/fa6";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBar({ setIsOpen }) {
  const navigate = useNavigate();
  let blue = "#00BAC7";
  const [bgColor, setBgColor] = useState(blue);
  const changeColor = () => {
    let white = "#FFFFF";
    setBgColor(white);
  };

  return (
    <div
      className="text-white"
      style={{
        zIndex: 5,
        width: "300px",
        height: "100%",
        backgroundColor: "#11354D",
        position: "fixed",
      }}
    >
      <div className="d-flex justify-content-between align-items-center py-4 px-3">
        <div>
          <img src={logo} alt="" style={{ width: "180px" }} />
        </div>
        <div>
          <div
            style={{ fontSize: "30px", textAlign: "center", color: "#00BAC7" }}
            onClick={() => setIsOpen(false)}
          >
            <IoIosCloseCircleOutline />
          </div>
        </div>
      </div>

      <ul className="px-5 py-4" style={{ fontWeight: "50px" }}>
        <li className="px-2 py-2">
          <button
            style={{
              all: "unset",
              width: "100%",
            }}
            onClick={() => {
              navigate("/");
              // changeColor();
            }}
          >
            Dashboard
          </button>
        </li>
        <li className="px-2 py-2">
          <Link style={{ all: "unset", width: "100%" }} to="/courses">
            Courses
          </Link>
        </li>
        <Link style={{ all: "unset", width: "100%" }} to="/programs">
          <li className="px-2 py-2">Program</li>
        </Link>
        <li className="px-2 py-2">
          <Link style={{ all: "unset", width: "100%" }} to="/sessions">
            Sessions
          </Link>
        </li>

        {/* <li className="px-2 py-2">
          <Link style={{ all: "unset", width: "100%" }} to="/sessionsManager">
            Sessions 
          </Link>
        </li> */}


        <li className="px-2 py-2">
          <Link style={{ all: "unset", width: "100%" }} to="users">
            All users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

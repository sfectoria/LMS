import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import send from "../../../assets/images/send.png";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../apps/App";
import { IoSend } from "react-icons/io5";

import { useParams } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { Button } from "react-bootstrap";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function ChatSession({setState,state}) {
  const { socket } = useContext(SocketContext);
  const [content, setContent] = useState("");
  const { sessionId } = useParams();
  const user = useSelector((store) => store.auth.me);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.emit("find-all-msgs", +sessionId);
  }, []); // request give me old msgs
  useEffect(() => {
    socket.on("get-all-msgs/" + sessionId, (data) => {
      setMessages(data);
    });
  }, []); // get old msgs

  useEffect(() => {
    socket.on("msg-session/" + sessionId, (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []); // new msg when someone send a msg

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        // behavior: "smooth",
      });
    }
  }, [containerRef, messages]);
  const userId = useSelector((state) => state.auth.me.id);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      senderId: userId,
      sessionId: +sessionId,
      content,
    });
    setContent("");
  };
  return (
    <div
      class=" d-flex justify-content-between  flex-column h-100 position-fixed "
      style={{ width: 700 }}
    >
      <div>
        <Button
          variant="light"
          onClick={() => {
            setState({ ...state, right: false });
          }}
        >
          X
        </Button>
      </div>
      <ul
        class="list-unstyled "
        style={{
          height: "100%",
          overflowY: "scroll",
          display: "flex", // Add display: flex to the parent container
          flexDirection: "column",
        }}
        ref={containerRef}
      >
        {messages?.map((elem, i) => (
          <div
            style={{ width: "100%" }}
            class={`d-flex py-3 gap-3 px-3  mb-4  ${
              elem.senderId === userId ? "justify-content-end" : ""
            }`}
            key={i}
          >
            <div class="card d-flex justify-content-between">
              <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">
                  {elem?.sender.firstName + " " + elem?.sender.lastName}
                </p>
                <p class=" d-flex gap-2 text-muted small mb-0">
                  {/* <ConversionDate
                            dateString={elem.createdAt}
                            includeHour={true}
                          /> */}
                </p>
              </div>
              <div class="card-body">
                <p class="mb-0">{elem?.content}</p>
              </div>
              {userId === elem.senderId && (
                <div className="d-flex justify-content-end">
                  {/* <IconButton color="error" aria-label="delete">
                          <DeleteIcon
                            onClick={() => {
                              // handelDelete(elem.id)
                            }}
                          />
                        </IconButton> */}
                </div>
              )}
            </div>
            <img
              src={elem?.sender.image} /// bel current user image
              alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
              height="60"
            />
          </div>
        ))}
      </ul>
      <form
        onSubmit={sendMessage}
        className="d-flex justify-content-center align-items-center gap-3 px-5 py-2"
      >
        {" "}
        <input
          required
          value={content}
          class="form-control "
          id="textAreaExample3"
          rows="1"
          onChange={(e) => {
            console.log(e.target.value);
            setContent(e.target.value);
          }}
          style={{
            borderRadius: "200px",
            // textAlign: "center",
            padding: "10px",
          }}
        ></input>
        <button
          style={{ all: "unset", cursor: "pointer" }}
          type="submit"
          onSubmit={sendMessage}
        >
          <IoSend style={{ width: "3rem", height: "3rem", color: "#f2b500" }} />
          {/* <img alt="" src={send} style={{ width: 50, heigh: 50 }} /> */}
        </button>
      </form>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";
import Camera, { IMAGE_TYPES, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CameraComponent = () => {
  const [validUser, setValidUser] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const user = useSelector((store) => store.auth.me);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  // Function to convert data URI to base64
  const dataURItoBase64 = (dataURI) => {
    return dataURI.split(",")[1];
  };

  async function handleTakePhoto(dataUri) {
    try {
      const base64Img = dataURItoBase64(dataUri); // Convert data URI to base64
      const response = await axios.post("http://localhost:9999/process_face", {
        email: user.email,
        img_base64: base64Img, // Send base64 image in the request
      });
      setResponseMsg(response.data.message);
      setValidUser(response.data.valid);
      setTimeout(() => {
        navigate(`/session`);
      }, 4000);
    } catch (error) {
      console.error("Error processing photo:", error);
      setResponseMsg("Error processing photo. Please try again.");
      setValidUser(false);
    }
  }

  return (
    <>
      <Camera
        isFullscreen={false}
        onTakePhoto={handleTakePhoto}
        imageType={IMAGE_TYPES.JPG}
        isImageMirror={true}
        idealFacingMode={FACING_MODES.USER}
        style={{ width: "100%" }}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        {validUser ? (
          <>
            <h1>Valid</h1>
            <h5>{responseMsg}</h5>
          </>
        ) : (
          <>
            <h1>Invalid</h1>
            <h5>{responseMsg}</h5>
          </>
        )}
      </div>
    </>
  );
};

export default CameraComponent;

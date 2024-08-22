import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bg.jpg";

import FormGroup from "react-bootstrap/esm/FormGroup";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendsession } from "../../../store/sessions";
import { fetchprograms } from "../../../store/Program";
import { fetchusers } from "../../../store/UserInfo";
import { Box, Chip, MenuItem, OutlinedInput, Select } from "@mui/material";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function AddSession() {
  const [session, setsession] = useState({userIds: [],});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(session);
  const programs = useSelector((state) => state.ProgramSlice.programs.items);
  const users = useSelector((state) => state.userSlice.users.items);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setvideoUrl] = useState(null);
  const [preview, setpreview] = useState(null);
  useEffect(() => {
    dispatch(fetchprograms());
    dispatch(fetchusers())
  }, [dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsession({ ...session, [name]: name === "programId" ? +value : value });
  };
 const handleFileChange = (e) => {
   if (e.target.files && e.target.files.length > 0) {
     setImageUrl(e.target.files[0]);
   }
 };
 const handleVideoChange = (e) => {
   if (e.target.files && e.target.files.length > 0) {
     setvideoUrl(e.target.files[0]);
   }
 };
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      let auxSession = { ...session };
      if (imageUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxSession = { ...auxSession, imageURL: response.data.path };
      }
      if (videoUrl) {
        const formData = new FormData();
        formData.append("file", imageUrl);
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        auxSession = { ...auxSession, videoURL: response.data.path };
      }
      console.log("session", auxSession)
      dispatch(sendsession(auxSession)).then((res) => {
        if (!res.error) {
          showSuccessToast(' session created')
         navigate("/sessions");
        } else showErrorToast('error ! you should fill the form');
      });
    }
      catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h3
        className="p-1 text-center py-5"
        style={{
          fontFamily: "Segoe UI",
          color: "#11354D",
          textDecoration: "underline",
        }}
      >
        Add new session
      </h3>

      <div class="container d-flex justify-content-center">
        <div style={{ width: "48rem" }} class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <p
                class="text- text-center"
                style={{ fontFamily: "Brittany Signature" }}
              >
                SFECTORIAN'S Sessions ✌️
              </p>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Image</Form.Label>
                  <p class="text-muted mb-0">
                    <input
                      accept="image/*"
                      type="file"
                      name="imageURL"
                      placeholder="session image"
                      className="px-3 border border-info form-control"
                      onChange={handleFileChange}
                      required
                    />
                  </p>
                  <Form.Label>Video</Form.Label>
                  <p class="text-muted mb-0">
                    <input
                      accept="video/*"
                      type="file"
                      name="videoURL"
                      placeholder="session video"
                      className="px-3 border border-info form-control"
                      onChange={handleVideoChange}
                      required
                    />
                  </p>

                  <hr />
                  <Form.Label>Title</Form.Label>
                  <p class="text-muted mb-0">
                    <input
                      type="text"
                      name="title"
                      placeholder="title of session"
                      className="px-3 border border-info form-control"
                      onChange={handleChange}
                      required
                    />
                  </p>

                  <hr />
                  <Form.Label>Description</Form.Label>
                  <p class="text-muted mb-0">
                    <input
                      type="text"
                      name="description"
                      placeholder="description of session"
                      className="px-3 border border-info form-control"
                      onChange={handleChange}
                      required
                    />
                  </p>

                  <hr />

                  <Form.Label>Duration</Form.Label>
                  <p class="text-muted mb-0">
                    <input
                      type="number"
                      name="duration"
                      placeholder="duration"
                      className="px-3 border border-info form-control"
                      onChange={handleChange}
                      required
                    />
                  </p>

                  <hr />

                  <Form.Label>Program</Form.Label>
                  <Form.Select
                    name="programId"
                    onChange={handleChange}
                    aria-label="Default select example"
                    required
                    className="px-3 border border-info form-control"
                  >
                    <option>Open this select menu</option>
                    {programs.map((item, i) => (
                      <option value={item.id}>{item.title}</option>
                    ))}
                  </Form.Select>

                  <hr />

                  <Form.Label>Membres</Form.Label>

                  <Select
                    labelId="demo-multiple-chip-label"
                    className="px-3 border border-info form-control "
                    id="demo-multiple-chip"
                    multiple
                    value={session.userIds}
                    onChange={(e) => {
                      setsession({
                        ...session,
                        userIds: [...e.target.value],
                      });
                    }}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value.id}
                            label={
                              users.find((elem) => (value = elem.id)).email
                            }
                          />
                        ))}
                      </Box>
                    )}
                    // MenuProps={MenuProps}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.email}
                      </MenuItem>
                    ))}
                  </Select>
                  <div class="d-flex justify-content-center py-3">
                    <Button
                      style={{ width: "7rem" }}
                      variant="warning"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

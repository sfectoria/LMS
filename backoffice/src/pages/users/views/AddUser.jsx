import React from "react";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ADDUSER from "../../../assets/images/user_add.png";
import { UserContext } from "../../../router/Router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { senduser } from "../../../store/UserInfo";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function AddUser() {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setimage] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let auxUser = { ...user };
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      auxUser = { ...auxUser, image: response.data.path };
    }
    dispatch(senduser(auxUser)).then((res) => {
      if (!res.error) {
        showSuccessToast(' user created')
       navigate("/users");
       
      } else showErrorToast('Email already invalide');
    });

    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: name === "phone" ? +value : value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setimage(e.target.files[0]);
    }
  };


  return (
    <div>
      <h3
        className="p-1 "
        style={{
          fontFamily: "Segoe UI",
          color: "#11354D",
          textDecoration: "underline",
        }}
      >
        Add user
      </h3>

      <div className="d-flex justify-content-center align-items-center  gap-4 py-2 flex-wrap">
        <div className="px-1 py-4 ">
          <div
            className="card p-5  form  "
            style={{ width: "42rem", height: "100%" }}
          >
            <div>
              <div className="d-flex justify-content-center py-3 align-items-center flex-wrap">
                <h1
                  style={{
                    fontFamily: "Brittany Signature",
                  }}
                >
                  Sfectoria
                </h1>
                <h1
                  style={{
                    fontFamily: "Brittany Signature",
                    color: "rgb(66, 177, 188)",
                  }}
                >
                  users ✌️
                </h1>
                <div
                  style={{
                    height: "5px",
                    width: "80px",
                    backgroundColor: "rgb(66, 177, 188)",
                    marginRight: "42px",
                  }}
                ></div>
              </div>
            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3 ">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    accept="image/*"
                    required
                    type="file"
                    name="image"
                    placeholder="avatar"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    onChange={handleChange}
                    style={{ width: "23rem" }}
                    aria-label="Default select example"
                    required
                  >
                    <option>Open this select menu</option>

                    <option value={"Student"}>Student</option>
                    <option value={"Teacher"}>Teacher</option>
                    <option value={"Manager"}>Manager</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                   
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    style={{ width: "37rem" }}
                    name="address"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    style={{ width: "16rem" }}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <div class="d-flex justify-content-center">
                <Button
                  style={{ width: "7rem" }}
                  class="btn btn-warning"
                  variant="warning"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div>
          <img src={ADDUSER} alt="" style={{ width: "18rem" }} id="imglogin" />
        </div>
      </div>
    </div>
  );
}

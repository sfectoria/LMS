import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { edituser, fetchuser } from "../../../store/UserInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EDITUSER from "../../../assets/images/edituser.png";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function EditUser() {
  const [image, setimage] = useState(null);
  const [user, updateuser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, "this is id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateuser({ ...user, [name]: name === "phone" ? +value : value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    dispatch(edituser({ body: auxUser, id: +id })).then((res) => {
      if (!res.error) navigate("/users");
      else alert("you should fill the form");
    });
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
      Edit user
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

            <Form onSubmit={handleSubmit}>
              
              <FormGroup className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <p class="text-muted mb-1">
                  <Form.Control
                    accept="image/*"
                    type="file"
                    name="image"
                    className="border border-info form-control"
                    placeholder="User photo"
                    onChange={handleFileChange}
                  />
                </p>
                <hr />
                <Form.Label>First Name</Form.Label>
                <p class="text-muted mb-0">
                  <input
                    type="text"
                    className="border border-info form-control form-control"
                    name="firstName"
                    placeholder=" first name"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Last Name</Form.Label>
                <p class="text-muted mb-0">
                  <input
                    type="text"
                    className="border border-info form-control"
                    name="lastName"
                    placeholder="last name"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Email</Form.Label>
                <p class="text-muted mb-0">
                  <input
                    type="email"
                    name="email"
                    className="border border-info form-control"
                    placeholder="email"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Password</Form.Label>

                <p class="text-muted mb-0">
                  <input
                    type="text"
                    className="border border-info form-control"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Phone</Form.Label>

                <p class="text-muted mb-0">
                  <input
                    type="tel"
                    name="phone"
                    className="border border-info form-control"
                    placeholder="phone"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Address</Form.Label>

                <p class="text-muted mb-0">
                  <input
                    type="text"
                    className="border border-info form-control"
                    name="address"
                    placeholder="adress"
                    onChange={handleChange}
                  />
                </p>

                <hr />

                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  className="border border-info form-control"
                  onChange={handleChange}
                  aria-label="Default select example"
                  required
                >
                  <option>Open this select menu</option>

                  <option value={"Student"}>Student</option>
                  <option value={"Teacher"}>Teacher</option>
                  <option value={"Manager"}>Manager</option>
                </Form.Select>

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

        <div className="px-2 py-5">
          <img src={EDITUSER} alt="" style={{ width: "18rem" }} id="imglogin" />
        </div>
      </div>
    </div>
  );
}

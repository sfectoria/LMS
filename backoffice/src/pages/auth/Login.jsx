import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import team from "../../assets/team.jpg";
import Form from "react-bootstrap/Form";
import logo from "../../assets/logo (1).png";
import loginImg from '../../assets/4794658.jpg'
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import "../../css/auth.css";
import { login } from '../../store/auth';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

export default function Login() {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  console.log(email)
  const [password, setPassword] = useState("");
  console.log(password)
  return (
    <div>
      {/* <Header /> */}

      <div className="d-flex justify-content-center gap-4 py-5 flex-wrap">
        <div className="px-5 py-4">
          <div
            className="card py-5 px-4 form"
            style={{ width: "30rem", height: "30rem" }}
          >
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(login({ email , password })).then((res) => {
               if (!res.error) {
                showSuccessToast('Welcome! You are now logged in.')
               navigate("/");
               
              } else showErrorToast('Authentication failed ! Please check your credentials.');
            })}}
            >
              <div>
                <div className="d-flex justify-content-center py-2 align-items-center flex-wrap">
                  <h1
                    style={{
                      fontFamily: "Brittany Signature",
                    }}
                  >
                    Welcome to
                  </h1>
                  <h1
                    style={{
                      fontFamily: "Brittany Signature",
                      color: "rgb(66, 177, 188)",
                    }}
                  >
                    Sfectoria
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
              <Form.Group className="mb-3 py-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div
                className="d-flex justify-content-center flex-wrap"
                style={{}}
              >
                <button
                  type="submit"
                  className="btn btn-warning py-2"
                  style={{ borderRadius: "40px", width: "17rem" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(login({ email, password }));
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="px-5">
          <img src={loginImg} alt="" style={{ width: "35rem" }} id="imglogin" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import logo from '../assets/logo (1).png'


function Header(props) {
//   const navigate = useNavigate();

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="">
            <img src={logo} width={"150px"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink}>
                Home
              </Nav.Link>
              <Nav.Link to="/aboutus" as={NavLink}>
                About us
              </Nav.Link>
              <Nav.Link to="/courses" as={NavLink}>
                Courses
              </Nav.Link>

              {/* <Col xs="auto" className="px-4">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    props.changeValueSearch(e);
                  }}
                  className=" mr-sm-2"
                />
              </Col> */}
            </Nav>
            <Button variant="outline-primary">Connection</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;









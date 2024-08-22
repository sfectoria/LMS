import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
 import Nav from "react-bootstrap/Nav";
 import Navbar from "react-bootstrap/Navbar";
 import Button from 'react-bootstrap/Button'; 
 import Col from 'react-bootstrap/Col';
 import Form from 'react-bootstrap/Form';

function Header(props) {
  

  const navigate = useNavigate();
  
  
  
  
  
  
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="">
            <img src={require("../assets/logo.png")} width={"150px"} />
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
              <Nav.Link to="/courses" as={NavLink} >
                Courses
              </Nav.Link>
              <Col xs="auto" className="px-4">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    props.changeValueSearch(e);
                  }}
                  className=" mr-sm-2"
                />
              </Col>
            </Nav>

            <Button variant="outline-primary" onClick={()=>window.location.href='http://localhost:3000'}>Connection</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header





























// import React, { Component } from "react";

// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Button from 'react-bootstrap/Button'; 
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';





// export default class Header extends Component {
//   constructor(props) {
//     super()
//     this.state = {
//       show: false
//     }
//     this.handleClose = this.handleClose.bind(this)
//   }
//   handleShow() {
//     this.setState({ show: true });
//   }

//   handleClose() {
//     this.setState({ show: false });
//   }

//   render() {
//     return (
//       <div>
//         <Navbar expand="lg" className="bg-body-tertiary">
//           <Container>
//             <Navbar.Brand href=""><img src={require("../assets/logo.png")} width={"150px"} /></Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="me-auto">
//                 <Nav.Link href="#home">Home</Nav.Link>
//                 <Nav.Link href="#link">About us</Nav.Link>
//                 <Col xs="auto" className="px-4">
//                 <Form.Control
//               type="text"
//               placeholder="Search"
//               onChange={(e) => {
//                 this.props.changeValueSearch(e); }}
//               className=" mr-sm-2"
//             />
//           </Col>

//               </Nav>

//               <Button variant="outline-primary" >Connection</Button>

//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </div>
//     );
//   }
// }


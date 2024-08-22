
import React, { Component, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Formulaire from '../pages/Formulaire';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";


function OneCard(props) {
   const { id } = useParams();
   const navigate = useNavigate();
  console.log(useParams());
  
   const [state, setState] = useState({});

    useEffect(() => {
      getCourse();
    }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/course/${id}`
      );
      setState(response.data);

    } catch (error) {
      navigate("/*");
    }

    
  }

  return (
    <div>
      <Card style={{ width: "20rem", height: "32rem" }}>
        <Card.Img
          variant="top"
          src={props.src}
          style={{ height: "12rem" }}
          className="thumb-img"
        />
        <Card.Body>
          <Card.Title style={{ width: "18rem", height: "65px" }}>
            {props.name}
          </Card.Title>
          <Card.Text
            style={{ width: "18rem", height: "144px", paddingTop: "10px" }}
          >
            {props.description}
          </Card.Text>
          <div className="d-flex justify-content-around">
            <Nav.Link to="/Course/:id" as={NavLink}>
              <Link
                to={`/${props.id}`}
                className="btn btn-primary"
                onClick={() => ({
                  src: props.src,
                  name: props.name,
                  body: props.body,
                  description:props.description
                })}
              >
                See more
              </Link>
              {/* <Button
                style={{ width: "7rem" }}
                variant="info"
                
              >
                More
              </Button> */}
            </Nav.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
} 

export default OneCard




















// import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import PopUp from './PopUp';
// import Formulaire from '../pages/Formulaire';


// export default class OneCard extends Component {
//   constructor(props){
//     super()
//     this.state={
//       show:false
//     }
//     this.handleClose=this.handleClose.bind(this)
//   }
    

//     handleShow() {
//       this.setState({ show: true });}

//       handleClose() {
//         this.setState({ show: false });
//       }
    
  
//   render() {
   
//     return (
//         <Card style={{ width: '20rem', height:"32rem" }}>
//         <Card.Img variant="top" src={this.props.image}  style={{height:'12rem'}} className="thumb-img" />
//         <Card.Body>
//           <Card.Title style={{width:'18rem', height:'65px'}}>{this.props.nom}</Card.Title>
//           <Card.Text style={{width:'18rem', height:'144px', paddingTop:"10px"}} >
//             {this.props.descrp}
//           </Card.Text>
//           <div className='d-flex justify-content-around'>
//           <Button style={{width:'7rem'}} variant="info" onClick={() => this.props.showForm({image: this.props.image,
// title: this.props.title,
//                   body: this.props.body,
//                   html: this.props.html,
//                   css: this.props.css,
//                   bootstrap:this.props.bootstrap,
//                    js:this.props.js,
//                     jquery:this.props.jquery,
//                      react:this.props.react,
//                        node:this.props.node,
//                         git:this.props.git,
//                          github:this.props.github
//                 }) }>More</Button>
         
//           </div>
//         </Card.Body>
//       </Card>
//      )
//   }
// }

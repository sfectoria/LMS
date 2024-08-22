
import Image from 'react-bootstrap/Image';
import React, { Component, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function Teachers() {
    const [state, setState] = useState({
    data: [],
    });
    
    const getData = async () => {
    try {
      let response = await axios.get("http://localhost:5000/teachers");
      setState({ data: response.data });
      console.log("this is data from backend", response.data);
      // console.log("this is data"+ response.data); manajmch najma3 chaine m3a array
    } catch (err) {
      console.log("Error getting cards");
    }
  };
  useEffect(() => {
    getData();
  }, []);
    return (
      <div>
        <div className="d-flex justify-content-center p-5 flex-wrap align-items-center flex-wrap">
          <h1 style={{ fontFamily: "Brittany Signature" }}>Our teachers</h1>
          <div
            style={{
              height: "5px",
              width: "80px",
              backgroundColor: "rgb(66, 177, 188)",
              marginRight: "42px",
            }}
          ></div>
        </div>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          {state.data.map((teacher) => (
            
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              {/* <Image src={this.props.src} roundedCircle   /> */}
              <div className="d-flex justify-content-center">
                <img
                  src={teacher.imageURL}
                  alt=""
                  style={{
                    width: "10rem",
                    height: "9rem",
                    borderRadius: "70%",
                  }}
                />
              </div>

              <Card.Title className="d-flex justify-content-center py-3">
                {teacher.name}
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted d-flex justify-content-center "
                style={{ color: "#11354D" }}
              >
                {teacher.specialty}
              </Card.Subtitle>
              <Card.Text className="text-center">
                {teacher.name}
                {teacher.about}
              </Card.Text>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </div>
          ))}
        </div>

      </div>
      // <div>
      //   <div className="d-flex justify-content-center p-5 flex-wrap align-items-center flex-wrap">
      //     <h1 style={{ fontFamily: "Brittany Signature" }}>Our teachers</h1>
      //     <div
      //       style={{
      //         height: "5px",
      //         width: "80px",
      //         backgroundColor: "rgb(66, 177, 188)",
      //         marginRight: "42px",
      //       }}
      //     ></div>
      //   </div>
      //   <div className="d-flex gap-3 justify-content-center flex-wrap">
      //     {state.data.map((teacher) => (
      //       <Card style={{ width: "18rem" }}>
      //         <Card.Body>
      //           {/* <Image src={this.props.src} roundedCircle   /> */}
      //           <div className="d-flex justify-content-center">
      //             <img
      //               src={teacher.src}
      //               alt=""
      //               style={{
      //                 width: "10rem",
      //                 height: "9rem",
      //                 borderRadius: "70%",
      //               }}
      //             />
      //           </div>

      //           <Card.Title className="d-flex justify-content-center py-3">
      //             {teacher.nom}
      //           </Card.Title>
      //           <Card.Subtitle
      //             className="mb-2 text-muted d-flex justify-content-center "
      //             style={{ color: "#11354D" }}
      //           >
      //             {teacher.specialite}
      //           </Card.Subtitle>
      //           <Card.Text className="text-center">
      //             {teacher.nom}
      //             {teacher.about}
      //           </Card.Text>
      //           <Card.Text></Card.Text>
      //         </Card.Body>
      //       </Card>
      //     ))}
      //   </div>
      // </div>
    );
}

import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import fabskillPhoto from "../assets/Fabskill.jpg";


export default function Carrousel() {
    const list = [fabskillPhoto];
    return (
      <div>
        <Carousel data-bs-theme="dark">
          {list.map((elem, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={elem}
                alt="First slide"
                height="600px"
                style={{ objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
}

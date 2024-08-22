import React, { Component } from "react";
import OneCategory from "./OneCategory";
import data from "../data/courseCategorie.json";

export default class Categories extends Component {
  render() {
    return (
      <div className="py-5">
        <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
        <h1 style={{fontFamily:'Brittany Signature'}}>Course Categories</h1>
        <div style={{height:"5px", width: "80px", backgroundColor: "rgb(66, 177, 188)", marginRight: "42px" }} >
          </div>  
        </div>
        


        <div className="d-flex justify-content-center flex-wrap gap-5">
          {data.map((category) => (
            <OneCategory
              id={category.id}
              nom={category.nom}
              src={category.src}
              dispon={category.dispon}
              Coursesnumber={category.Coursesnumber}
              
            />
          ))}
        </div>
      </div>
    );
  }
}

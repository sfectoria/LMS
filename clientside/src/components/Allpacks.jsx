import React, { Component } from "react";
import Forfaits from "../data/Forfaits.json";
import Onepack from "./Onepack";
import Card from "react-bootstrap/Card";
    
export default class Allpacks extends Component {
    constructor(props) {
      super();
    }
    render() {
      return (
        <div style={{backgroundColor:"#F4FAFB",marginTop:"10rem"}}>
          <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
          <h1 style={{fontFamily:'Brittany Signature'}}>Our Packs</h1>
          <div style={{height:"5px", width: "80px", backgroundColor: "rgb(66, 177, 188)", marginRight: "42px" }} >
            </div>  
          </div>
  
            <div className="d-flex flex-wrap gap-5 p-5 justify-content-center">
              {Forfaits.map((card) => (
                <Onepack
                  key={card.id}
                  image={card.src}
                  nom={card.name}
                  descrp={card.description}
                  Dur={card.Durée}
                  price={card.price}
            
                  showForm={this.props.showForm}
                />
              ))}
            </div>
          </div>
        
      );
    }
  }
  
import React, { Component } from "react";
import OneReview from "./OneReview";
import axios from "axios";

export default class AllReviews extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await axios.get("http://localhost:3000/Reviews.json");
      this.setState({ data: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (




      <div>


<div className="d-flex justify-content-center p-5 flex-wrap align-items-center flex-wrap">
        <h1 style={{ fontFamily: "Brittany Signature" }}>Reviews</h1>
        <div
          style={{
            height: "3px",
            width: "80px",
            backgroundColor: "rgb(66, 177, 188)",
            marginRight: "42px",
          }}
        ></div> 
         </div>

        <div className="d-flex flex-wrap  p-1 justify-content-center">
          {this.state.data.map((review) => (
            <OneReview
              id={review.id}
              nom={review.nom}
              src={review.src}
              job={review.job}
            />
          ))}
        </div>



      </div>








     
     
    );
  }
}

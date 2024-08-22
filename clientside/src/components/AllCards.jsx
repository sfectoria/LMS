import React, { Component, useEffect, useState } from "react";
import OneCard from "./OneCard";
import Card from "react-bootstrap/Card";
import axios from "axios";

function AllCards(props) {
  const [state, setState] = useState({
    data: [],
  });

  const getData = async () => {
    try {
      let response = await axios.get("http://localhost:3100/api/v1");
      setState({ data: response.data });
      console.log("this is data from backend", response.data);
      // console.log("this is data"+ response.data); manajmch najma3 chaine m3a array
      console.log(response.data);
    } catch (err) {
      console.log("Error getting cards");
    }
  };



  useEffect(() => {
    if (props.searchValue.length) {
      SearchData();
    } else getData();
  }, [props.searchValue]);

  console.log("this is the input", props.searchValue.length);

  const SearchData = async () => {
    try {
      let response = await axios.post("http://localhost:3100/search", {
        text: props.searchValue,
      });
      console.log("data filtred", response.data);
      setState({ data: response.data });
      // console.log("this is the final data ",state.data)
    } catch {
      console.log("Error getting cards");
    }
  };




  
  return (
    <div style={{ backgroundColor: "#F4FAFB" }}>
      <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
        <h1 style={{ fontFamily: "Brittany Signature" }}>Our Courses</h1>
        <div
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "rgb(66, 177, 188)",
            marginRight: "42px",
          }}
        ></div>
      </div>

      <div className="d-flex flex-wrap gap-5 p-5 justify-content-center">
        {state.data.map((card) => (
          <OneCard
            id={card.id}
            src={card.src}
            name={card.name}
            description={card.description} 
            price={card.price}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCards;

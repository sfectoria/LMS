import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Link from '@mui/material/Link';
import { Button } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Courses() {
    const [state, setState] = useState({
      data: [],
    });
    const getData = async () => {
      try {
        let response = await axios.get("http://localhost:5000/courses");
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
        </div>

        <div className="d-flex flex-wrap gap-5 p-5 justify-content-center">
          {state.data.map((card) => (
             <Card sx={{ maxWidth: 345 }}>
             <CardMedia
               component="img"
               alt="green iguana"
               height="140"
               image={card.imageURL}
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="div">
               {card.title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
               {card.description}
               </Typography>
             </CardContent>
             <CardActions size="small">
             <Link href={`${card.id}`} underline="hover">
  {'See more'}
</Link>    </CardActions>
           </Card>
          ))}
        </div>
      </div>
    );
}

import React, { Component, useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';



// import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
// import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import logo from "../assets/logo.png";
import video from "../assets/7534244-hd_1920_1080_25fps.mp4";
import "../Pages/css/buttonform.css";
import "../Pages/css/gallery.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Box from "@mui/material/Box";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Pricing from "@mui/joy/Card";

export default function CourseDetails() {
  const [state, setState] = useState({});
  const [form, setForm] = useState({});
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3100/api/v1", form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  };

  const getData = async () => {
    try {
      let response = await axios.get("http://localhost:5000/courses/" + id);
      setState({ data: response.data });
      console.log("this is data from backend", response.data);
    } catch (err) {
      console.log("Error getting cards");
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap gap-4 p-4 justify-content-center">
        <div>
          <Pricing
            size="lg"
            variant="outlined"
            orientation="horizontal"
            sx={{
              textAlign: "center",
              maxWidth: "100%",
              width: 900,
              resize: "horizontal",
              overflow: "auto",
            }}
          >
            <AspectRatio ratio="1" sx={{ width: 300 }}>
              <img src={state.data?.imageURL} loading="lazy" alt="" />
            </AspectRatio>
            <CardContent
              sx={{
                textAlign: "center",
                flex: "0  600px",

                justifyContent: "center",
                px: 'var(--Card-padding: "70px")',
              }}
              size="lg"
            >
              <Typography level="title-lg" id="card-description"></Typography>{" "}
              {state.data?.title}{" "}
              <div className="d-flex justify-content-center">
                <div
                  style={{
                    height: "5px",
                    width: "80px",
                    backgroundColor: "rgb(66, 177, 188)",
                  }}
                ></div>
              </div>
              <Typography level="body-lg">
                {" "}
                {state.data?.description}
              </Typography>
            </CardContent>
          </Pricing>
        </div>

        <div style={{ height: "6px", width: "350px" }}>
          <Pricing
            size="sm"
            variant="solid"
            color="neutral"
            invertedColors
            sx={{ bgcolor: "neutral.900", height: 322 }}
          >
            <Chip size="lg" variant="outlined">
              Professional Certificate
            </Chip>
            <Typography level="h2">Price</Typography>
            <Divider inset="none" />
            <List
              size="sm"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                mx: "calc(-1 * var(--ListItem-paddingX))",
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Invite your team (chat room)
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                + 3 Projects
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Planning flexible
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Access to all advanced training modules
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                3 team members
              </ListItem>
            </List>
            <Divider inset="none" />
            <CardActions>
              <Typography level="title-lg" sx={{ mr: "auto" }}>
                {state.data?.price}{" "}
                <Typography fontSize="lg" textColor="text.tertiary">
                  Dt
                </Typography>
              </Typography>
            </CardActions>
          </Pricing>
        </div>
      </div>

      <div className="overlay">
       <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
      </video>
      
      <div
          className="containerf"
          style={{ width: "32.5rem", height: "30.5rem" }}
        >
         
       
{/*          
          <button class="btn btn-light" onClick={() => handleSubmit()}>
            Accueil
          </button> */}
          <Form className="mx-auto "  noValidate validated={validated}  onSubmit={handleSubmit}>
          <h1 className="d-flex justify-content-center fs-1 py-4">Registration form</h1>
            <Form.Group
 className="mb-3 d-flex p-2 gap-5"
              controlId="validationCustom01"
            >
              <Form.Control
              required
                className="form-controle "
                type="text"
                name="FirstName"
                placeholder="FirstName"
                onChange={handleChange}
              />
               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control
                name="LastName"
                className="form-controle"
                placeholder="LastName"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex p-2 gap-5 "
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="email"
                className="form-controle"
                placeholder="Email"
                onChange={handleChange}
              />
              <Form.Control
                name="phone"
                className="form-controle"
                placeholder="Phone"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex p-2 gap-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="adress"
                className="form-controle"
                placeholder="Adresse"
                onChange={handleChange}
              />
              <Form.Control
                name="occupation"
                className="form-controle"
                placeholder="occupation"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex p-2 gap-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="date"
                type="dateOfBirth"
                className="form-controle"
                placeholder="Date of birth"
                onChange={handleChange}
              />
              <Form.Control
                name="studies"
                className="form-controle"
                placeholder="studies"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex p-2 gap-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="college"
                className="form-controle"
                placeholder="college"
                onChange={handleChange}
              />
              <Form.Control
                name="degree"
                className="form-controle"
                placeholder="Degree"
                onChange={handleChange}
              />
            </Form.Group>

         

            <div className="  py-2 px-2 d-flex justify-content-center ">
        
              <button
                type="submit"
                name="button"
                class="button-51"
                onSubmit={() => handleSubmit()}
                onClick={handleClick}
              >
                validate my registration request


                <svg width="79" height="46" viewBox="0 0 79 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_f_618_1123)">
    <path d="M42.9 2H76.5L34.5 44H2L42.9 2Z" fill="url(#paint0_linear_618_1123)"/>
  </g>
  <defs>
    <filter id="filter0_f_618_1123" x="0" y="0" width="78.5" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_618_1123"/>
    </filter>
    <linearGradient id="paint0_linear_618_1123" x1="76.5" y1="2.00002" x2="34.5" y2="44" gradientUnits="userSpaceOnUse">
      <stop stop-color="white" stop-opacity="0.6"/>
      <stop offset="1" stop-color="white" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
</svg>
               </button>
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Thanks for submitting the form.
  </Alert>
</Snackbar>
             
            </div>
          </Form>
        </div>
        
      </div>
      <div>
  
     

{/* 
        <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
          <h1 style={{ fontFamily: "Brittany Signature" }}>gallery</h1>
          <div
            style={{
              height: "5px",
              width: "80px",
              backgroundColor: "rgb(66, 177, 188)",
              marginRight: "42px",
            }}
          ></div>

          <div class="gallery" style={{ marginTop: "5%" }}>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Image src={state.data?.src2} thumbnail />
                </Col>
                <Col xs={6} md={4}>
                  <Image src={state.data?.src1} thumbnail />
                </Col>
                <Col xs={6} md={4}>
                  <Image src={state.data?.src} thumbnail />
                </Col>
              </Row>
            </Container>
          </div>
        </div> */}

<div className="containergal">
  
      <h1 className="heading" style={{ fontFamily: "Brittany Signature" }}> Gallery</h1>
     
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide >
          <img  src={state.data?.src2} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src2} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={state.data?.src} alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controler d-fex justify-content-center">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
 
      </div>
    </div>
  );
}

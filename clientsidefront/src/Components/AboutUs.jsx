import React, { useState } from 'react'
import aboutus from "../assets/about.jpg";
import Box from '@mui/joy/Box';
import axios from 'axios';
import { Form } from 'react-bootstrap';




export default function AboutUs() {
  
  return (
    <div>
      <div className="d-flex justify-content-center p-5 flex-wrap align-items-center flex-wrap">
        <h1 style={{ fontFamily: "Brittany Signature" }}>About us</h1>
     
    
        <div
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "rgb(66, 177, 188)",
            marginRight: "42px",
          }}
        ></div>
      </div>

      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div
              class="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div class="position-relative h-100 ">
                <img
                  class="img-fluid position-absolute w-100 h-100"
                  src={aboutus}
                  alt=""
                  style={{ objectFit: "cover", borderRadius: "30%" }}
                />
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h1 class="mb-4" style={{ fontFamily: "Brittany Signature" }}>
                Welcome to Sfectoria
              </h1>
              <p class="mb-4">
                At Sfectoria, we're committed to pushing the boundaries of
                innovation. We're excited to harness the power of the latest
                cutting-edge technologies for your project, ensuring that it not
                only meets but exceeds your expectations.
              </p>
              <p class="mb-4">
                At SFECTORIA, we specialize in creating custom web applications
                and websites perfectly tailored to your unique needs. Whether
                you're a client with a project or an individual seeking digital
                skills, we're here for you. Our training offerings cater to all
                levels and foster your digital growth.
              </p>
              <div class="row gy-2 gx-4 mb-4">
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>Skilled
                    Instructors
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>Online
                    Classes
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>
                    International Certificate
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>Creative
                    Team
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>
                    Top-notch services
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i class="fa fa-arrow-right text-primary me-2"></i>
                    Focus on Mastery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

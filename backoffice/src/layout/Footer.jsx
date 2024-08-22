
import React, { Component } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

export default function Footer() {
  return (
    <div>
      <footer
        className="page-footer font-small text-white blue pt-2"
        style={{ backgroundColor: "#20374E", minHeight: "60vh" }}
      >
        <div className="container-fluid text-center text-md-left">
          <div className="col-md-11 mt-md-0 mt-3 p-5 d-flex justify-content-between"></div>
        </div>

        <div class="container text-center">
          <div class="row">
            <div class="col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.8180751139844!2d10.1899554533054!3d36.82287912900089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3550232fe4b9%3A0x488b37a9204e79dd!2sSfectoria!5e0!3m2!1sen!2stn!4v1708125099414!5m2!1sen!2stn"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                style={{
                  width: "20rem",
                  height: "17rem",
                  borderRadius: "40px",
                }}
              />
            </div>
            <div class="col order-5">
              <h5>Contact</h5>

              <p className="py-5">
                <CiLocationOn /> 75 Rue Khaireddine Pacha, Pacha Center
                Building, Block C, 1st floor, Office C2, Montplaisir, Tunis.
              </p>
              <p>
                <CiLocationOn /> contact@sfectoria.com
              </p>
              <p>
                <CiLocationOn /> (+216) 55 180 992
              </p>
            </div>
            <div class="col order-1">
              <div>
                <h5>Sfectoria</h5>
                <p className="py-5">
                  Unleash Your Digital Growth with SFECTORIA: Crafting
                  Exceptional Web and Mobile Experiences
                </p>
                <ul
                  className="list-unstyled d-flex gap-4 justify-content-center "
                  style={{ textDecoration: "none" }}
                >
                  <li style={{ width: "40px", fontSize: "25px" }}>
                    <a href="#!">
                      <FaFacebook />
                    </a>
                  </li>
                  <li style={{ width: "40px", fontSize: "25px" }}>
                    <a href="#!">
                      <FaInstagram />
                    </a>
                  </li>
                  <li style={{ width: "40px", fontSize: "25px" }}>
                    <a href="#!"></a>
                    <FaLinkedin />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

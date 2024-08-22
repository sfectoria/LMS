import React, { Component } from 'react'
import front from '../assets/dab0498f-7405-497f-ae02-dde9fd87406a copy.jpg'

export default class AboutHome extends Component {
  render() {
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
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{minHeight:"400px" }}>
                    <div class="position-relative h-100 ">
                        <img class="img-fluid position-absolute w-100 h-100" src={front} alt="" style={{objectFit:"cover", borderRadius:"30%" }}/>
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                    
                    <h1 class="mb-4" style={{fontFamily: "Brittany Signature"}}>Welcome to Sfectoria</h1>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                    <div class="row gy-2 gx-4 mb-4">
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>Online Classes</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>Online Classes</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                        </div>
                    </div>
                    <a class="btn btn-primary py-3 px-5 mt-2" href="">Read More</a>
                </div>
            </div>
        </div>
    </div>
        
      </div>
    )
  }
}

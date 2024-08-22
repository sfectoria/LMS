import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import fabskillPhoto from '../assets/Fabskill.jpg';
import Groupesfec from '../assets/Groupesfec.jpg';
import Groupesf from '../assets/Groupesf.jpg';
import JCI from '../assets/JCI.jpg';


const list = [fabskillPhoto, Groupesfec, Groupesf, JCI]
export default class CarousselSfectoria extends Component {
  render() {
    return (
      <div>

        <Carousel data-bs-theme="dark">
          {list.map((elem, i) =>
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={elem}
                alt="First slide"
                height="600px"
                style={{ objectFit: 'cover' }}
              />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    )
  }
}
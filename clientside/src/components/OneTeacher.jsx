import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default class OneTeacher extends Component {
    constructor(props){
        super()
    }



  render() {
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">
         <Card style={{ width: '18rem' }}>
      <Card.Body >
      {/* <Image src={this.props.src} roundedCircle   /> */}
      <div className='d-flex justify-content-center'>
      <img src={this.props.src} alt=""  style={{ width: '10rem' ,height:'9rem',borderRadius:"70%" }} />

      </div>



      

        <Card.Title className='d-flex justify-content-center py-3'>{this.props.nom}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center " style={{color:"#11354D"}}>{this.props.specialite}</Card.Subtitle>
        <Card.Text className='text-center'>{this.props.nom}{this.props.about}</Card.Text>
        <Card.Text>
         
        </Card.Text>
      </Card.Body>
    </Card>
        
      </div>
    )
  }
}

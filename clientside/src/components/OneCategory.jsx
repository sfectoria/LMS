import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';

export default class OneCategory extends Component {
    constructor(props){
        super()
    }




  render() {
    return (
      <div>
        <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>{this.props.dispon}</Card.Header>
        
        <Card.Body>
            <div className='d-flex justify-content-center'>
            <img src={this.props.src} alt=""  style={{ width: '6rem' }}/>
            </div>
            
          <Card.Title className='d-flex justify-content-center p-3'>{this.props.nom}</Card.Title>
          <Card.Text>
            {this.props.Coursesnumber} Courses
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

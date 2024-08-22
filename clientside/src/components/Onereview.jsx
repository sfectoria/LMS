import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';

export default class Onereview extends Component {
    constructor(props){
      super()}
      render() {
        return ( 
          <div>
    <Toast style={{ width: '27rem', height:"18rem" }} className="border border-warning">
    <Toast.Header className="p-3 mb-2 bg-warning text-dark">
    {/* <Toast.Title>{this.props.key}</Toast.Title> */}
    <img src="" className="rounded me-2" alt="" />
        <strong className="me-auto"  >{this.props.name}</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      {/* <Toast.Body>{this.props.user}</Toast.Body> */}
      <Toast.Body>{this.props.rat}</Toast.Body>
      <Toast.Body >{this.props.comm}</Toast.Body>
      <Toast.Body>{this.props.dat}</Toast.Body>
    </Toast>
    </div>
  );
}
}


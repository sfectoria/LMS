import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class PopUp extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>{this.props.title}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <img src={this.props.imag} alt="" style={{ width: "25rem" }} />
            </div>

            <h4></h4>
            <p>{this.props.body}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              onClick={() => {
                this.props.handleClose();
                this.props.showForm({
                  image: this.props.image,
                  title: this.props.title,
                  body: this.props.body,
                  html: this.props.html,
                  css: this.props.css,
                  bootstrap:this.props.bootstrap,
                   js:this.props.js,
                    jquery:this.props.jquery,
                     react:this.props.react,
                       node:this.props.node,
                        git:this.props.git,
                         github:this.props.github
                });
              }}
            >
              Learn more
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

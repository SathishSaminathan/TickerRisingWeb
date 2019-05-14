import React, { Component } from "react";
import { Modal, Button } from "antd";

import images from "../../assets/images";
// import Button from "../Button";

import "./Header.css";

class Header extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="header">
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <div className="left">
          <img className="logoImage" src={images.logoImage} />
        </div>
        <div className="right">
          <Button
            onClick={this.showModal}
            type="primary"
            className="custom_button"
          >
            RAISE TICKET
          </Button>
        </div>
      </div>
    );
  }
}

export default Header;

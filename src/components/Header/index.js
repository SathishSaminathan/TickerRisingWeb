import React, { Component } from "react";
import { Button, Avatar, Popover } from "antd";

import images from "../../assets/images";
// import Button from "../Button";

import "./Header.css";
import FormModal from "../FormModal";

class Header extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const text = <span>Ananya</span>;
    const content = (
      <div>
        <p>Logout</p>
      </div>
    );
    return (
      <div className="header">
        <FormModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <div className="left">
          <img className="logoImage" src={images.logoImage} />
        </div>
        <div className="right">
          <div className="avatarContainer">
            <Popover
              placement="bottom"
              title={text}
              content={content}
              trigger="click"
            >
              <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Popover>
          </div>
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

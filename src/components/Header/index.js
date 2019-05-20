import React, { Component } from "react";
import { Button, Avatar, Popover, Tooltip } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import firebase from "../../config/firebase";
import images from "../../assets/images";
// import Button from "../Button";

import "./Header.css";
import FormModal from "../FormModal";
import { customNotification } from "../Notification";
import AppConstants from "../../constants/AppConstants";

class Header extends Component {
  state = {
    visible: false,
    email: "AnanyaAnanyaAnanya@gmail.com"
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

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const text = <span>LoggedIn as</span>;
    const content = (
      <div className="popover_style">
        <Tooltip
          placement="left"
          title={
            <CopyToClipboard
              text={this.state.email}
              onCopy={() =>
                customNotification(
                  AppConstants.INFO_MESSAGE,
                  "Email To Clipboard!!",
                  AppConstants.BOTTOM_RIGHT
                )
              }
            >
              <span>{this.state.email}</span>
            </CopyToClipboard>
          }
        >
          <span className="email">AnanyaAnanyaAnanya@gmail.com</span>
        </Tooltip>
        <Button type="primary" onClick={this.logout}>
          Logout
        </Button>
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
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
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

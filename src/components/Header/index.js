import React, { Component } from "react";
import { Button, Avatar, Popover, Tooltip } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";

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
    ticketsRef: firebase.database().ref("tickets"),
    storageRef: firebase.storage().ref("images"),
    image: null,
    buttonLoading: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { image } = this.state;
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      const image = values.image[0];
      console.log("checking file..", image);
      if (!err) {
        const file = values.image[0];
        this.setState(
          {
            image: file,
            buttonLoading: true
          },
          () => console.log("Received values of form: ", this.state.image)
        );
        this.createTicket(values);
      }

      //  upload image starts here
      // const metadata = {
      //   contentType: "image/jpeg"
      // };

      // const upload = this.state.storageRef
      //   .child("image")
      //   .put(this.state.image, {
      //     contentType: metadata
      //   });

      // upload.on(
      //   "state_changed",
      //   snapshot => {
      //     console.log("progress");
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   () => {
      //     console.log("completed");
      //   }
      // );
    });
  };

  createTicket = values => {
    const form = this.formRef.props.form;
    const ticket = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      ticketId: 1,
      issuDescription: values.description,
      priority: values.priority,
      status: AppConstants.PENDING
    };
    if (ticket) {
      this.state.ticketsRef
        .child(this.props.currentUser.uid)
        .push()
        .set(ticket)
        .then(() => {
          customNotification(AppConstants.SUCCESS_MESSAGE, "Ticket Raised!!!");
          this.setState({ visible: false, buttonLoading: false }, () =>
            form.resetFields()
          );
        })
        .catch(err => {
          console.log(err);
          customNotification(AppConstants.ERROR_MESSAGE, err);
          this.setState({ buttonLoading: false });
        });
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  logout = () => {
    firebase.auth().signOut();
  };

  getFile = image => {
    console.log("file...", image);
    this.setState({
      image
    });
  };

  render() {
    console.log(this.props.currentUser && this.props.currentUser.email);

    const email = this.props.currentUser && this.props.currentUser.email;
    const text = <span>LoggedIn as</span>;
    const content = (
      <div className="popover_style">
        <Tooltip
          placement="left"
          title={
            <CopyToClipboard
              text={email}
              onCopy={() =>
                customNotification(
                  AppConstants.INFO_MESSAGE,
                  "Email To Clipboard!!",
                  AppConstants.BOTTOM_RIGHT
                )
              }
            >
              <span>{email}</span>
            </CopyToClipboard>
          }
        >
          <span className="email">{email}</span>
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
          getFile={this.getFile}
          buttonLoading={this.state.buttonLoading}
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

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);

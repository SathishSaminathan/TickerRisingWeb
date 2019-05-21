import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import firebase from "../../../config/firebase";
import images from "../../../assets/images";

import "./Login.css";
import { customNotification } from "../../../components/Notification";
import AppConstants from "../../../constants/AppConstants";

class Login extends Component {
  state = {
    buttonLoading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      buttonLoading: true
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(createdUser => {
            console.log(createdUser.user);
            customNotification(
              AppConstants.SUCCESS_MESSAGE,
              `Logged In as ${createdUser.user.displayName}`
            );
          })
          .catch(err => {
            console.log(err);
            customNotification(AppConstants.ERROR_MESSAGE, err.message);
            this.setState({
              buttonLoading: false
            });
          });
      }
    });
  };

  render() {
    const { buttonLoading } = this.state;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="container">
        <div className="logoImage">
          <img src={images.logoImage} className="logo" />
        </div>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={buttonLoading}
              onClick={this.handleSubmit}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        <span className="help">Help Desk</span>
      </div>
    );
  }
}

export default Form.create()(Login);

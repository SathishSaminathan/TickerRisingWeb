import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import firebase from "../../../config/firebase";
import images from "../../../assets/images";
import AppConstants from "../../../constants/AppConstants";
import { customNotification } from "../../../components/Notification";

class Register extends Component {
  state = {
    email: null,
    password: null,
    buttonLoading: false
  };

  setValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  handleSubmit = e => {
    this.setState({
      buttonLoading: true
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(user => {
            console.log(user);
            this.setState({
              buttonLoading: false
            });
            customNotification(
              AppConstants.SUCCESS_MESSAGE,
              "User Successfully Created!!!"
            );
          })
          .catch(err => {
            console.log(err);
            this.setState({
              buttonLoading: false
            });
            customNotification(AppConstants.ERROR_MESSAGE, err.message);
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
                name="email"
                onChange={e => this.setValue(e)}
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
                name="password"
                onChange={e => this.setValue(e)}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
              loading={buttonLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <span className="help">Help Desk</span>
      </div>
    );
  }
}

export default Form.create()(Register);

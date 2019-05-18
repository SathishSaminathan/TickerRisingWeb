import React, { Component } from "react";
import { Form, Modal, Input, Upload, Button, Icon, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

class FormModal extends Component {
  state = {
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: "http://www.baidu.com/xxx.png"
      }
    ]
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "1" ? "man" : "2"}!`
    });
  };

  handleChange = info => {
    let fileList = [...info.fileList];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);
    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({ fileList });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const props = {
      // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true
    };
    return (
      <Modal
        title="Raise your Issue"
        visible={visible}
        onOk={onCreate}
        okText="SUBMIT"
        onCancel={onCancel}
        centered
        closable={false}
        width="80%"
        // footer={null}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item label="Issue Decription">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input the title of collection!"
                }
              ]
            })(<TextArea autosize={{ minRows: 18, maxRows: 25 }} />)}
          </Form.Item>
          <Form.Item label="Upload Image">
            {getFieldDecorator("upload", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile,
              rules: [
                {
                  required: true,
                  message: "Select atleast one file!"
                }
              ]
            })(
              <Upload
                name="logo"
                // action="/upload.do"
                listType="picture-card"
                {...props}
                // fileList={this.state.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="Priority">
            {getFieldDecorator("gender", {
              rules: [
                { required: true, message: "Please select one priority!" }
              ]
            })(
              <Select
                placeholder="Select Your Priority Level"
                onChange={this.handleSelectChange}
              >
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          centered
          width='50%'
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Modal>
    );
  }
}

export default Form.create()(FormModal);

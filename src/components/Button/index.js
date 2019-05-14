import React, { Component } from "react";

import "./Button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state={
        ...this.props
    }
  }
  render() {
    return (
      <div className="buttonContainer">
        <div className="button">{this.state.title}</div>
      </div>
    );
  }
}

export default Button;

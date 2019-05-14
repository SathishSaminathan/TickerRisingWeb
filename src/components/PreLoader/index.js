import React, { Component } from "react";
import $ from "jquery";
import { findDOMNode } from "react-dom";

import "./PreLoader.css";

let COUNTER = 0;

class PreLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    };
  }

  componentDidMount() {
    const el = findDOMNode(this.refs.fill);
    const container = findDOMNode(this.refs.preloader);
    let count = setInterval(() => {
      console.log(`${COUNTER}%`);
      if (COUNTER < 101) {
        $(el).css("width", `${COUNTER}%`);
        COUNTER++;
      } else {
        clearInterval(count);
        $(container).fadeOut();
      }
    }, this.state.timer);
  }

  render() {
    return (
      <div ref="preloader" className="preloader">
        <div className="container">
          <div className="text">Round's Edge</div>
          <div className="title">Help Desk</div>
          <div className="loader">
            <div className="bar">
              <div className="fill" ref="fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreLoader;

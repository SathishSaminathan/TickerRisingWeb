import React, { Component } from "react";
import $ from "jquery";
import { findDOMNode } from "react-dom";

import PreLoader from "./components/PreLoader";
import Loader from "./components/Loader";

class App extends Component {
  state = {
    Loading: true
  };
  componentDidMount() {
    const preloader = findDOMNode(this.refs.preloader);
    setTimeout(() => {
      this.setState({
        Loading: false
      });
      $(preloader).fadeOut();
    }, 2500);
  }
  render() {
    const { Loading } = this.state;
    return (
      <React.Fragment>
        <PreLoader timer={1} ref="preloader" />
        {/* <Loader/> */}
        {/* {!Loading && <div>hai</div>} */}
      </React.Fragment>
    );
  }
}
export default App;

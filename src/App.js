import React, { Component } from "react";
import $ from "jquery";
import { findDOMNode } from "react-dom";

// import PreLoader from "./components/PreLoader";
// import Loader from "./components/Loader";
import Login from "./screens/auth/Login";
import Layout from "./screens/layout/Layout";
import Routes from "./routes/routes";

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
        {/* <PreLoader timer={1} ref="preloader" /> */}
        {/* <Loader/> */}
        {/* {!Loading && <div>hai</div>} */}
        {/* <Layout /> */}
        <Layout>
          <Routes />
        </Layout>
      </React.Fragment>
    );
  }
}
export default App;

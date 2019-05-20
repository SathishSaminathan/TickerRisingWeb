import React, { Component } from "react";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route
} from "react-router-dom";

import firebase from "./config/firebase";
// import PreLoader from "./components/PreLoader";
import Loader from "./components/Loader";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

import DashBoard from "./screens/DashBoard";

class App extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    // const preloader = findDOMNode(this.refs.preloader);
    // setTimeout(() => {
    //   this.setState({
    //     Loading: false
    //   });
    //   $(preloader).fadeOut();
    // }, 2500);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false
      });
      if (user) {
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
      }
    });
  }
  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {/* <PreLoader timer={1} ref="preloader" /> */}
        {/* <Loader/> */}
        {/* {!Loading && <div>hai</div>} */}
        {/* <Layout /> */}
        {/* <Layout> */}
        {loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register}/>
            <Route path="/" exact component={DashBoard} />
            {/* <Route path="/" exact component={Login} /> */}
            <Route render={() => <h4>Error Page</h4>} />
          </Switch>
        )}

        {/* </Layout> */}
      </React.Fragment>
    );
  }
}

const RouteWithAuth = withRouter(App);

export default RouteWithAuth;

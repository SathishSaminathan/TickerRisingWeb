import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../screens/auth/Login";
import DashBoard from "../screens/DashBoard";
import Register from "../screens/auth/Register";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/register" component={Register} />
          {/* <Route path="/" exact component={Login} /> */}
          <Route render={()=><h4>Error Page</h4>}/>
        </Switch>
      </Router>
    );
  }
}

export default Routes;

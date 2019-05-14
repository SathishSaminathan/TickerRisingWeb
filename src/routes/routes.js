import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../screens/auth/Login";
import DashBoard from "../screens/DashBoard";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/DashBoard" component={DashBoard} />
          {/* <Route path="/" exact component={Login} /> */}
          <Route render={()=><h4>Error Page</h4>}/>
        </Switch>
      </Router>
    );
  }
}

export default Routes;

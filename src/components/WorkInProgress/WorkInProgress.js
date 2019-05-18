import React, { Component } from "react";

import AppConstants from "../../constants/AppConstants";
import "./WorkInProgress.css";
import DashboardServices from "../../services/dashboard";

class WorkInProgress extends Component {
  _dashboardServices = new DashboardServices();
  state = {
    result: null,
    loading: true
  };

  fetchData = () => {
    this._dashboardServices
      .getData(AppConstants.WIP)
      // .then(res => res.json())
      .then(result => {
        console.log("fetched Data...", result.data);
        this.setState(
          {
            result: result.data,
            loading: false
          },
          () =>
            this.props.gettingValues(
              this.state.result,
              AppConstants.WIP,
              AppConstants.WIP_HEADER,
              this.state.loading
            )
        );
      });
  };

  sendData = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        this.fetchData();
        this.props.gettingValues(
          this.state.result,
          AppConstants.WIP,
          AppConstants.WIP_HEADER,
          this.state.loading
        );
      }
    );
  };

  render() {
    return (
      <div className="WorkInProgressListContainer">
        <div className="title">WIP</div>
        <div className="issueCard" onClick={this.sendData}>
          <div className="badge">
            <div>23</div>
          </div>
          <div className="details">
            <p>
              Priority Level {1} - {2}
            </p>
            <p>
              Priority Level {2} - {4}
            </p>
            <p>
              Priority Level {3} - {17}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkInProgress;

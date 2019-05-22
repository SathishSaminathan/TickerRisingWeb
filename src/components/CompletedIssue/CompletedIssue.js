import React, { Component } from "react";

import AppConstants from "../../constants/AppConstants";
import "./CompletedIssue.css";
import DashboardServices from "../../services/dashboard";

class CompletedIssue extends Component {
  _dashboardServices = new DashboardServices();
  state = {
    result: null,
    loading: true
  };

  fetchData = () => {
    console.log("fetch");
    this._dashboardServices
      .getData(AppConstants.COMPLETED)
      // .then(res => res.json())
      .then(result => {
        // console.log(result.data);
        this.setState(
          {
            result: result.data,
            loading: false
          },
          () =>
            this.props.gettingValues(
              this.state.result,
              AppConstants.COMPLETED,
              AppConstants.COMPLETED_HEADER,
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
          AppConstants.COMPLETED,
          AppConstants.COMPLETED_HEADER,
          this.state.loading
        );
      }
    );
  };

  render() {
    return (
      <div className="CompletedIssueListContainer">
        <div className="title">Completed</div>
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

export default CompletedIssue;

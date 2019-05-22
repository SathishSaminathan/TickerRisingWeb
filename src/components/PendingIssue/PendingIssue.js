import React, { Component } from "react";

import AppConstants from "../../constants/AppConstants";
import "./PendingIssue.css";
import DashboardServices from "../../services/dashboard";

class PendingIssue extends Component {
  _dashboardServices = new DashboardServices();
  state = {
    result: null,
    loading: true
  };

  // componentDidMount() {
  //   // this.fetchData();
  // }

  fetchData = () => {
    console.log("fetch");
    this._dashboardServices
      .getData(AppConstants.PENDING)
      // .then(res => res.json())
      .then(result => {
        console.log(result.data);
        this.setState(
          {
            result: result.data,
            loading: false
          },
          () =>
            this.props.gettingValues(
              this.state.result,
              AppConstants.PENDING,
              AppConstants.PENDING_HEADER,
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
          AppConstants.PENDING,
          AppConstants.PENDING_HEADER,
          this.state.loading
        );
      }
    );
    // this.setState({
    //   loading: true
    // });
    // this.fetchData();
    // let promise = new Promise((resolve, reject) => {
    //   this.fetchData();
    //   resolve();
    // });
    // promise.then(() => {
    //   this.props.gettingValues(
    //     this.state.result,
    //     AppConstants.PENDING,
    //     AppConstants.PENDING_HEADER,
    //     this.state.loading
    //   );
    //   console.log("loading state false");
    // });
  };

  render() {
    return (
      <div className="PendingIssueListContainer">
        <div className="title">Pending Issues</div>
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

export default PendingIssue;

import React, { Component } from "react";
import { Row, Col, Table, Button, Icon, Input } from "antd";
import Highlighter from "react-highlight-words";

import "./DashBoard.css";

import PendingIssueList from "../../components/PendingIssue/PendingIssue";
import WorkInProgressList from "../../components/WorkInProgress/WorkInProgress";
import CompletedIssueList from "../../components/CompletedIssue/CompletedIssue";

class DashBoard extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    cardType: null,
    tableHeader: null,
    searchText: ""
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };

  getData = (data, cardType, tableHeader, loading) => {
    // alert(cardType);
    console.log(tableHeader);
    this.setState(
      {
        cardType,
        tableHeader,
        data,
        loading
      }
      // console.log("results data...", this.state.data)
    );
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          // value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { cardType, tableHeader } = this.state;
    let tableTheme = cardType;
    let tableHeaderText = tableHeader;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        filters: [
          { text: "London", value: "London" },
          { text: "New York", value: "New York" }
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
          { text: "4", value: "4" },
          { text: "5", value: "5" }
        ],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value)
      }
    ];

    return (
      <div>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <PendingIssueList gettingValues={this.getData} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <WorkInProgressList gettingValues={this.getData} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <CompletedIssueList gettingValues={this.getData} />
          </Col>
        </Row>
        <Row>
          <div className="tableContainer">
            <Col xs={{ span: 24 }} lg={{ span: 22 }}>
              {tableHeader && (
                <Table
                  title={() => tableHeaderText}
                  columns={columns}
                  dataSource={this.state.data}
                  onChange={this.handleChange}
                  className={`custom_table ${tableTheme}`}
                  loading={this.state.loading}
                />
              )}
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default DashBoard;

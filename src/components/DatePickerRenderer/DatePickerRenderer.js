/* eslint-disable react/no-set-state */
import React, { Component } from 'react';

export default class DatePickerRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  convertDate(str) {
    var date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [month, day, date.getFullYear()].join('/');
  }

  componentWillMount() {
    this.setDate(this.props.value);
  }

  refresh(params) {
    this.setDate(params.value);
  }

  setDate(date) {
    this.setState({date: date});
  }

  render() {
    return <p>{this.state.date ? this.convertDate(this.state.date) : null}</p>;
  }
}

/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DatePickerEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.value ? new Date(this.props.value) : new Date(),
      open: true,
      inputValue: this.props.value
    };
  }

  validateDate(value) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d{1}|2\d{1}|3[01])\/(1|2)\d{3}$/;
    return date_regex.test(value);
  }

  convertDate(str) {
    var date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [month, day, date.getFullYear()].join('/');
  }

  changeInputValue(value) {
    this.setState({ inputValue: value });
    if (this.validateDate(value)) this.setState({ date: new Date(value) });
  }

  getValue() {
    return this.convertDate(this.state.date);
  }

  isPopup() {
    return true;
  }

  setDate(date) {
    this.setState({
      date: date,
      inputValue: this.convertDate(date),
      open: false
    });
  }

  render() {
    return (
      <DatePicker
        customInput={
          <DatePickerInputCustom
            changeInputValue={this.changeInputValue.bind(this)}
            height={this.props.eGridCell.clientHeight}
            inputValue={this.state.inputValue}
            width={this.props.eGridCell.clientWidth}
          />
        }
        onChange={date => this.setDate(date)}
        onInputClick={() => this.setState({ open: true })}
        open={this.state.open}
        popperClassName={
          (this.props.rowIndex % this.props.agGridReact.gridOptions.paginationPageSize) < 6
            ? 'showBottom'
            : 'showTop'
        } // set css popper
        popperModifiers={{
          flip: {
            enabled: false // if true -> auto location
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        popperPlacement={
          (this.props.rowIndex % this.props.agGridReact.gridOptions.paginationPageSize) < 6
            ? 'bottom-start'
            : 'top-start'
        } // set popper location
        selected={this.state.date}
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class DatePickerInputCustom extends React.Component {
  convertDate(str) {
    var date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [month, day, date.getFullYear()].join('/');
  }

  render() {
    const { onClick, width, height, inputValue, changeInputValue } = this.props;
    return (
      <input
        onChange={event => changeInputValue(event.target.value)}
        onClick={onClick}
        style={{
          height: height,
          width: width,
          padding: '0px 5px',
          border: 'solid #b5dffc 2px',
          borderRadius: '3px',
          outline: 'none'
        }}
        value={
          inputValue
            ? inputValue.toString().length > 10
              ? this.convertDate(inputValue)
              : inputValue
            : null
        }
      />
    );
  }
}

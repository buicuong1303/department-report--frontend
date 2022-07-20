/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { convertSelectedOptions } from 'utils/convertSelectedOptions'

export default class SelectedEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: this.props.colDef.selectedOptions,
      selected: this.props.value,
    };
  }

  getValue() {
    return this.state.selected;
  }

  isPopup() {
    return true;
  }

  handleChange(selected) {
    this.setState({ selected: selected });
  }

  render() {
    return (
      <Select
        onChange={(event) => {this.handleChange(event.target.value)}}
        style={{ 
          height: this.props.eGridCell.clientHeight, 
          width: this.props.eGridCell.clientWidth,
          lineHeight: '40px',
        }}
        value={this.state.selected}
      >
        {this.state.selectedOptions.map(item => (
          <MenuItem 
            key={item}
            value={item}
          >
            {convertSelectedOptions(item)}
          </MenuItem>
        ))}
      </Select> 
    );
  }
}

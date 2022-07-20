/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { convertSelectedOptions } from 'utils/convertSelectedOptions';

export default class SelectedRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  componentWillMount() {
    this.setSelected(this.props.value);
  }

  refresh(params) {
    this.setSelected(params.value);
  }

  setSelected(selected) {
    this.setState({ selected: selected });
  }

  render() {
    return <p style={{color: '#3f51b5', fontWeight: 'bold'}}>{convertSelectedOptions(this.state.selected)}</p>;
  }
}

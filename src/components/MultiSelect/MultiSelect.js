/* eslint-disable react/jsx-max-props-per-line */
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Checkbox, FormControl, InputLabel, Select } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
const useStyles = makeStyles(theme => ({
  formControl: {},
  wrapperAgents: {
    border: '1px solid #ccc'
  },
  label: {
    width: '55px',
    backgroundColor: '#ffff',
    textAlign: 'center'
  },
  getContentAnchorEl: null
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
      fontSize: 13
    }
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  getContentAnchorEl: null
};
const CustomMultiSelect = props => {
  const classes = useStyles();
  const { addSelectedAgent, removeSelectedAgent, checkAll, isCheckAll } = props;
  // eslint-disable-next-line
  const handleCheckAll = e => {
    if (!checkAll) return;
    checkAll(e.target.checked);
  };
  const handleCheckboxChange = event => {
    if (event.target.checked) {
      addSelectedAgent(JSON.parse(event.target.value));
      // dispatch(addSelectedAgentIC(JSON.parse(event.target.value)));
      // setItems();
    }
    if (event.target.checked === false) {
      removeSelectedAgent(JSON.parse(event.target.value));
      // dispatch(removeSelectedAgentIC(JSON.parse(event.target.value)));
    }
  };

  return (
    <FormControl className={clsx(props.className)} variant="outlined">
      <InputLabel
        className={classes.label}
        id="demo-mutiple-checkbox-label"
        shrink
        variant="outlined"
      >
        {props.label}
      </InputLabel>
      <Select
        MenuProps={MenuProps}
        displayEmpty
        id="demo-mutiple-checkbox"
        label={'Agents'}
        labelId="demo-mutiple-checkbox-label"
        margin="dense"
        multiple
        renderValue={selected => {
          if (selected && selected.length > 0) {
            if (selected.length === 1) {
              return `${selected[0].label}`;
            }
            // selected.sort();
            return `${selected[0].label} + ${selected.length - 1}`;
          } else if(selected && selected.length === 0){
            return '';
          } else if (props.options && props.options.length > 0) {
            return `${props.options[0].label} + ${props.options.length - 1}`;
          }
        }}
        value={props.selectedItems}
        // value={items}
      >
        {props.options.length > 0 && (
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 13,
              borderBottom: '1px solid #ccc',
              fontWeight: 'bold'
            }}
          >
            <Checkbox checked={isCheckAll} onChange={handleCheckAll} />
            Check all
          </label>
        )}
        {props.options.map(item => (
          <label
            key={item.value}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Checkbox
              checked={props.selectedItems.some(record => {
                return record.label === item.label;
              })}
              name={item.value}
              onChange={handleCheckboxChange}
              value={JSON.stringify(item)}
            />
            {item.label}
          </label>
        ))}
      </Select>
    </FormControl>
  );
};
CustomMultiSelect.propTypes = {
  options: PropTypes.array,
  checkAll: PropTypes.func.isRequired
};

CustomMultiSelect.defaultProps = {
  options: [],
  checkAll: null
};
export default CustomMultiSelect;

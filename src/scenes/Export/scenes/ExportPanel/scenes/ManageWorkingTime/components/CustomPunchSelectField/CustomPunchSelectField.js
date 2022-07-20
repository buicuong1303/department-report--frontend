/* eslint-disable react/jsx-max-props-per-line */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: '0px 5px'
    }
  },
  formControl: {
    width: '100%',
    margin: '4px'
  },
  select: {
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120
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
const CustomPunchSelectField = props => {
  const classes = useStyles();

  const { field, label, options,form, className } = props;
  const { name } = field;
  const { errors, isValid } = form;
  const showError = errors[name] && !isValid;
  const handleSelectOptionChange = e => {
    const selectedValue = e.target.value;
    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
  };
  return (
    <FormControl
      className={clsx(classes.formControl,className)}
      error={showError}
      variant="outlined"
    >
      <InputLabel
        className={classes.label}
        id="demo-simple-select-outlined-label"
        margin="dense"
      >
        {label}
      </InputLabel>
      <Select
        MenuProps={MenuProps}
        className={classes.select}
        id="demo-simple-select-outlined"
        label={label}
        labelId="demo-simple-select-outlined-label"
        margin="dense"
        {...field}
        onChange={handleSelectOptionChange}
      >
        {options &&
          options.map(item => (
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{showError && errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default CustomPunchSelectField;

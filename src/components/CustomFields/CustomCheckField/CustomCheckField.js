import { Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  checkField:{
    margin: '4px'
  }
}));
const CustomCheckField = props => {
  const classes = useStyles();
  const { field, label } = props;
  const { value,name } = field;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value && value.toLocaleLowerCase() === 'yes' ? true : false}
          className={classes.checkField}
          color="primary"
          name={name}
          value={value}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckField;

import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

const Checkbox = (props) => {
  const { field, onUpdateValueField, disabled, className } = props;

  return (
    <FormControlLabel 
      className={className}
      control={<MuiCheckbox
        {...field}
        checked={field.value}
        disabled={disabled}
        onClick={onUpdateValueField}
      />}
      label={props.label}
    />
  );
};

export default Checkbox;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@material-ui/core';
import { ErrorMessage, useField } from 'formik';
import { TextError } from 'components';
import { Autocomplete } from '@material-ui/lab';

const TextField = (props) => {
  const { style, field, form, meta, options, onUpdateValue} = props;

  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [value, setValue] = useState('');
  const [optionFilters, seOptionFilters] = useState(options);

  const onChange = value => {
    setValue(value);
    seOptionFilters(filterOptions(options, value));

    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(() => {
        form.setFieldValue(field.name, value);
        if (onUpdateValue) {
          onUpdateValue();
        }
      }, 400)
    );
  };

  const filterOptions = (options, value) => {
    // eslint-disable-next-line
    return options.filter((option) => {
      if(value && option.value.toLowerCase().indexOf(value.toLowerCase()) >= 0) return option;
    });
  } 

  useEffect(() => {
    setValue(field.value || '');
  }, [field]);

  return (
    <Autocomplete
      disableClearable
      freeSolo
      onChange={(event, value) => {
        onChange(value);
      }}
      options={optionFilters.map((option) => option.value)}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          InputProps={{ ...params.InputProps }}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      )}
      style={style}
      value={value}
    />
  )
}


TextField.propTypes = {
  className: PropTypes.string,
  inputComponent: PropTypes.any,
  style: PropTypes.object,
};

export default React.memo(TextField);

import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const TextFieldPercent = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      suffix=" %"
      //thousandSeparator
    />
  );
};

TextFieldPercent.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextFieldPercent;

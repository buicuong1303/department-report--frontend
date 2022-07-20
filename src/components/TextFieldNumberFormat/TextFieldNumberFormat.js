import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const TextFieldNumberFormat = props => {
  const { dataIndex, inputRef, name, onChange, isDollar, isPercent, isHours, isMinutes, thousandSeparator, maxValue, onUpdateValueField,isPhoneNumber, ...other } = props;

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const onKeyUp = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(() => {
        if (onUpdateValueField) {
          onUpdateValueField();
        }
      }, 400)
    );
  };

  return (
    <NumberFormat
      {...other}
      format={isPhoneNumber ? '(###) ###-####' : false}
      getInputRef={inputRef}
      onKeyUp={onKeyUp}
      onValueChange={values => {
        onChange({
          target: {
            value: maxValue ? values.value <= Number(maxValue) ? values.value : Number(maxValue) : values.value,
            name: name ? name : ''
          },
          index: dataIndex ? dataIndex : '',
        });
      }}
      prefix={isDollar ? '$' : ''}
      suffix={
        isPercent ? '%' :
          isHours ? ' hrs' :
            isMinutes ? ' mins'
              : ''
      }
      thousandSeparator={thousandSeparator}
    />
  );
};

TextFieldNumberFormat.propTypes = {
  dataIndex: PropTypes.number,
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onUpdateValueField: PropTypes.any,
};

export default TextFieldNumberFormat;

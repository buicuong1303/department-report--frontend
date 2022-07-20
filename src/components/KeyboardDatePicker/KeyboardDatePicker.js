/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker as MuiKeyboardDatePicker } from '@material-ui/pickers';
import { useField } from 'formik';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

const KeyboardDatePicker = props => {
  const { className, style, form, field, print, onUpdateValue, readOnly } = props;
  const [fieldChild, meta, helpers] = useField(field.name);

  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [value, setValue] = useState(null);

  const onChange = value => {
    setValue(value);

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

  useEffect(() => {
    setValue(field.value || '');
  }, [field]);

  return (
    <MuiKeyboardDatePicker
      InputProps={{
        readOnly: readOnly,
      }}
      className={className}
      error={!!meta.error}
      format="MM/dd/yyyy"
      helperText={meta.error}
      keyboardIcon={print ? null : <InsertInvitationIcon />}
      onChange={(date) => onChange(date)}
      readOnly={readOnly}
      style={style}  
      value={value}
    />   
  );
};

KeyboardDatePicker.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default KeyboardDatePicker;

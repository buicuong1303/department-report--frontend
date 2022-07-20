/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select as MuiSelect } from '@material-ui/core';
import { useField } from 'formik';

const SelectField = (props) => {
  const { className, style, form, field, children, onUpdateValueField, readOnly, ...rest } = props;
  const [fieldChild, meta, helpers] = useField(field.name);

  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [value, setValue] = useState('');


  const onChange = event => {

    setValue(event.target.value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(() => {
        form.setFieldValue(field.name, event.target.value);
        if (onUpdateValueField) {
          onUpdateValueField();
        }
      }, 400)
    );
  };

  useEffect(() => {
    setValue(field.value || '');
  }, [field]);

  return (
    <MuiSelect
      className={className}
      onChange={onChange}
      readOnly={readOnly}
      style={style}
      value={value}
    >
      { children }
    </MuiSelect>
  );
};

SelectField.propTypes = {
  className: PropTypes.string,
  onUpdateValueField: PropTypes.any,
  style: PropTypes.object,
};

export default React.memo(SelectField);

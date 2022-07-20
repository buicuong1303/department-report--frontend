import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

// eslint-disable-next-line
const useStyles = makeStyles(theme => ({
  textField: {
    margin: '4px'
  }
}));
const CustomPunchTextField = props => {
  const classes = useStyles();
  const {
    field,
    label,
    type,
    className,
    inputProps,
    InputLabelProps,
    form,
    onChangeValue,
    formikManagement
  } = props;
  const { name,value } = field;
  const { errors, isValid } = form;
  const showError = errors[name] && !isValid;

  const handleOnChange = async (event) => {
    event.persist();
    //*thuc hien viec set formik value bang tay
    await formikManagement.setFieldValue(
      name,
      event.target.value
    );
    //* goi callback tra lai
    onChangeValue();
  };

  return (
    <>
      <TextField
        InputLabelProps={InputLabelProps}
        className={clsx(classes.textField, className)}
        error={showError}
        helperText={showError && errors[name]}
        id={name}
        inputProps={inputProps}
        label={label}
        margin="dense"
        name={name}
        onChange={handleOnChange}
        type={type}
        value={value}
        variant="outlined"
      />
      {/* {showError && <p>{errors[name]}</p>} */}
    </>
  );
};

export default CustomPunchTextField;

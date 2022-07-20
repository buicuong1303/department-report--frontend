import { makeStyles,  withStyles, } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

// eslint-disable-next-line
const useStyles = makeStyles(theme => ({
  textField: {
    margin: '4px 0px',
    width: '100%'
  },

}));
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& label': {
      color: 'gray',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },

  },
})(TextField);
const CustomTextField = props => {
  const handleTextFieldChange = (e) => {
    let textValue = e.target.value;

    if(type === 'time' && textValue.split(':').length < 3){
      textValue = textValue + ':00';
    }
    const changeEvent = {
      target: {
        name: name,
        value: textValue
      }
    };
    field.onChange(changeEvent);
  };
  const classes = useStyles();
  const {
    field,
    label,
    type,
    className,
    inputProps,
    InputLabelProps,
    form,
    disable,
    multiline,
    rowsMax
  } = props;
  const { name, value } = field;
  const { errors, isValid } = form;
  const showError = errors[name] && !isValid;
  return (
    <>
      <CssTextField
        error={showError}
        id={name}
        {...field}
        InputLabelProps={InputLabelProps}
        className={clsx(classes.textField, className)}
        disabled={disable}
        // helperText={showError && errors[name]}
        helperText={errors[name]}
        inputProps={inputProps}
        label={label}
        margin="dense"
        multiline={multiline}
        onChange={handleTextFieldChange}
        rowsMax={rowsMax}
        type={type}
        value={value}
        variant="outlined"
      />
      {/* {showError && <p>{errors[name]}</p>} */}
    </>
  );
};

export default CustomTextField;

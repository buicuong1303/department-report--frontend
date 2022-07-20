import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyle = makeStyles(() => ({
  root: {
    color: 'red',
    display: 'block',
    textAlign: 'left'
  }
}));

const TextError = props => {
  const classes = useStyle();
  const { className, message } = props;

  return (
    <div className={clsx(classes.root, className)}>
      {message}
    </div>
  );
};

TextError.propTypes = {
  className: PropTypes.any,
  message: PropTypes.string
};

export default TextError;

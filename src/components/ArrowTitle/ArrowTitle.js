import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row',
    width: 'auto',
    display: 'inline-flex'
  },
  rectangle: {
    height: '30px',
    color: '#ffffff',
    fontSize: '16px',
    backgroundColor: '#37474f',
    textAlign: 'left',
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  arrow: {
    width: '0px',
    height: '0px',
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
    borderLeft: '25px solid #37474f'
  }
}));

const ArrowTitle = ({ title, className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.rectangle}>{ title }</div>
      <div className={classes.arrow} />
    </div>
  );
};

ArrowTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default ArrowTitle;

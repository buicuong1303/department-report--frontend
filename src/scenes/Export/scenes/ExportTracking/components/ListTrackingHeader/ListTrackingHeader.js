import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.grey[300],
    fontSize: '18px',
    fontWeight: 'bold',
    height: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
  },
  time: {
    flex: 2,
  },
  fileName: {
    flex: 2
  },
  status: {
    flex: 2
  },
  action: {
    flex: 1
  }
}));

const ListTrackingHeader = (props) => {
  const { className } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.time}> Time </div>
      <div className={classes.fileName}> File Name </div>
      <div className={classes.status}> Status </div>
      <div className={classes.action}> Action </div>
    </div>
  );
};

ListTrackingHeader.propTypes = {
  className: PropTypes.any
};

export default ListTrackingHeader;

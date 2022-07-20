/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomButton } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '30px',
  },
  time: {
    flex: 2
  },
  fileName: {
    flex: 2
  },
  status: {
    flex: 2
  },
  btnDownload: {
    flex: 1
  }
}));
const ListTrackingItem = props => {
  const classes = useStyles();
  const { item, onDownload, className } = props || {};

  const handleDownload = () => {
    console.log('Download...' + item);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.time}>{item.lastModifiedTime}</div>
      <div className={classes.fileName}>{item.fileName}</div>
      <div className={classes.status}>{item.status}</div>
      <div className={classes.btnDownload}><CustomButton /></div>
    </div>
  );
};

ListTrackingItem.propTypes = {
  item: PropTypes.object,
  onDownload: PropTypes.func,
  className: PropTypes.any
};

export default ListTrackingItem;

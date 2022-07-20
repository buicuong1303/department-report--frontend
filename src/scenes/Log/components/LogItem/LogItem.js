import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Tag from '../Tag';
import clsx from 'clsx';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: '20px',
    paddingRight: '3px'
  },
  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#cccc'
  },
  dataItem: {
    textAlign: 'left',
    paddingLeft: '40px'
  },
  hidden:{
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));
const LogItem = props => {
  const classes = useStyles();
  const { logItem, className, onOpen, onHashTagChange } = props || {};

  return (
    <div className={clsx(classes.root, className)} >
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {moment(logItem.lastModifiedTime).format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <div
        className={clsx(classes.dataItem, classes.hidden)}
        style={{ flex: '2' }}
      >
        {logItem.ip}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '2' }}
      >
        {logItem.fullName}
      </div>
      <div
        className={clsx(classes.dataItem, classes.hidden)}
        style={{ flex: '2' }}
      >
        {logItem.logType}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '3' }}
      >
        {logItem.message}
      </div>
      <div
        className={clsx(classes.dataItem, classes.hidden)}
        style={{ flex: '1' }}
      >
        <Button
          color="inherit"
          onClick={() => onOpen(logItem)}
          style={{ color: 'green' }}
        >
          Detail
        </Button>
      </div>
      <div
        className={clsx(classes.dataItem, classes.hidden)}
        style={{ flex: '2' }}
      >
        <Tag content={logItem.hashTag} onHashTagChange={onHashTagChange} />
      </div>
    </div>
  );
};

export default LogItem;

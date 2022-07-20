/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { GetApp, HourglassEmptyOutlined, WarningOutlined } from '@material-ui/icons';
import * as qs from 'query-string';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    '& > div': {
      padding: '0 10px'
    }
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
    flex: 1,
  },
  icBtnDownload: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icBtnPending: {
    marginLeft: '10px',
    color: 'orange',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icBtnFailed: {
    marginLeft: '10px',
    color: 'red',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));
const ListTrackingItem = props => {
  const classes = useStyles();
  const { item, onDownload, className, exportTracking } = props || {};

  const handleDownload = () => {
    window.location.href = `${
      // eslint-disable-next-line no-undef
      process.env.REACT_APP_BASE_URL
    }/export?${qs.stringify({
      url: exportTracking.path
    })}`;
    // onDownload(exportTracking);
    // moment(exportTracking.lastModifiedTime, 'YYYYMMDDTHHmmss GMTZZ').format('MM-DD-YYYY')
  };
  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.time}>{moment(exportTracking.creationTime, 'YYYYMMDDTHHmmss GMTZZ').format('MM-DD-YYYY hh:mm:ss')}</div>
      <div className={classes.fileName}>{exportTracking.path.slice(exportTracking.path.lastIndexOf('/')+1)}</div>
      <div className={classes.status}>{exportTracking.reportStatus}</div>
      {
        exportTracking.reportStatus === 'successful' ? <div className={classes.btnDownload}>
          <IconButton
            className={classes.icBtnDownload}
            color="primary"
            component="span"
            disableFocusRipple
            disableRipple
            onClick={handleDownload}
          >
            <GetApp />
          </IconButton>
        </div> : ''
      }
      {
        exportTracking.reportStatus === 'failed' ? <div className={classes.btnDownload}>
          <WarningOutlined className={classes.icBtnFailed} />
        </div> : ''
      }
      {
        exportTracking.reportStatus === 'pending' ? <div className={classes.btnDownload}>
          <HourglassEmptyOutlined className={classes.icBtnPending} />
        </div> : ''
      }
    </div>
  );
};

ListTrackingItem.propTypes = {
  item: PropTypes.object,
  onDownload: PropTypes.func,
  className: PropTypes.any
};

export default ListTrackingItem;

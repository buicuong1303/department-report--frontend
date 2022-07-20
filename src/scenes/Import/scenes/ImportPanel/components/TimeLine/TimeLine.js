import React from 'react';
import './TimeLine.css';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  timeLine: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },

  timeLine_item: {
    margin: '0px 10px',
    lineHeight: '40px',
    color: '#c1c1c1 !important',
  },

  active: {
    color: `${theme.palette.primary.main} !important`
  },

  timeLineContent: {
    color: 'white',
  },
}));

const TimeLine = (props) => {
  // eslint-disable-next-line
  const { timeLine, ...rest } = props;

  let classes = useStyles();

  return (
    <>
      <div className={classes.timeLine}>
        <div
          className={clsx(classes.timeLine_item, timeLine.pointerActive0 ? classes.active : '')}
          id="pointer0"
        >
          <span className={classes.timeLineContent}>Choose Files</span>
        </div>

        <div
          className={clsx(classes.timeLine_item, timeLine.pointerActive1 ? classes.active : '')}
          id="pointer1"
        >
          <span className={classes.timeLineContent}>Validate Files</span>
        </div>

        <div
          className={clsx(classes.timeLine_item, timeLine.pointerActive2 ? classes.active : '')}
          id="pointer2"
        >
          <span className={classes.timeLineContent}>Upload Files</span>
        </div>
      </div>
    </>
  );
};

TimeLine.propTypes = {
  timeLine: PropTypes.object,
};

export default TimeLine;

/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { ListTrackingItem, ListTrackingHeader } from '../../components';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    fontSize:'14px',
    overflowY: 'auto',
    flex: '1 0 0',
  },
  listTrackingItem: {
    padding: '8px 0px',
    borderBottom: '1px solid #d6d6d6'
  },
  header: {
    width: '100%'
  }
}));
const ListTracking = props => {
  const classes = useStyles();

  const { isFetching, isFinished, onFetching, listExportTracking, className } = props;
  function handleScroll() {
    var ele = document.querySelector('#listAct');
    if (
      Math.ceil(ele.scrollTop) + ele.clientHeight < ele.scrollHeight ||
      isFinished ||
      isFetching
    ) {

      return;
    }
    onFetching(true);
  }

  window.onresize  =  function  onresize() {
    var  listActParent  =  document.querySelector('#listAct');
    var  listActItem  =  document.querySelector('#listAct ul');
    if (listActParent.clientHeight  >=  listActItem.clientHeight) onFetching(true);
    onFetching(false);
  };

  const handleDownload = (item) => {
    console.log('download: ' + JSON.stringify(item));
  };

  useEffect(() => {
    return () => window.onresize = null;
  },[]);
  return (
    <div className={clsx(classes.root, className)}>
      <ListTrackingHeader className={classes.header}/>

      <div className={classes.list} id="listAct" onScroll={handleScroll}>
        <ul>
          {listExportTracking
            ? listExportTracking.map((item, index) => (
              <ListTrackingItem
                className={classes.listTrackingItem}
                exportTracking={item}
                key={index}
                onDownload={handleDownload}
              />
            ))
            : ''}
        </ul>
      </div>
    </div>
  );
};

ListTracking.propTypes = {
  items: PropTypes.array,
  isFinished: PropTypes.bool,
  isFetching: PropTypes.bool,
  onFetching: PropTypes.func,
  className: PropTypes.any,
};

export default ListTracking;

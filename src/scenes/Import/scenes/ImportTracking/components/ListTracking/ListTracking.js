/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { ListTrackingItem } from '../../components';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    fontSize:'14px',
    overflowY: 'auto',
    flex: '1 0 0',
  },
  listTrackingItem: {
    padding: '8px 0px',
    borderBottom: '1px solid #d6d6d6'
  }
}));
const ListTracking = props => {
  const classes = useStyles();

  const { items, isFetching, isFinished, onFetching } = props;
  function handleScroll() {
    var ele = document.querySelector('#listAct');
    if (
      Math.ceil(ele.scrollTop) + ele.clientHeight < ele.scrollHeight ||
      isFinished ||
      isFetching
    ) {

      return;
    }
    // eslint-disable-next-line
    onFetching(true);
  }

  window.onresize  =  function  onresize() {
    var  listActParent  =  document.querySelector('#listAct');
    var  listActItem  =  document.querySelector('#listAct ul');
    if (listActParent.clientHeight  >=  listActItem.clientHeight) onFetching(true);
    onFetching(false);
  };

  useEffect(() => {
    return () => window.onresize = null;
  },[]);
  return (
    <div className={classes.root} id="listAct" onScroll={handleScroll}>
      <ul>
        {items
          ? items.map((item, index) => (
            <ListTrackingItem
              className={classes.listTrackingItem}
              item={item}
              key={index}
            />
          ))
          : ''}
      </ul>
    </div>
  );
};

ListTracking.propTypes = {
  items: PropTypes.array,
  isFinished: PropTypes.bool,
  isFetching: PropTypes.bool,
  onFetching: PropTypes.func,
};

export default ListTracking;

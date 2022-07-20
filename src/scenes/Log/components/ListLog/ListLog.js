/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LogItem from '../LogItem';
import SimpleDialog from '../SimpleDialog';
const useStyles = makeStyles(theme => ({
  file__item: {
    padding: '15px 0px',
    border: '1px solid gray',
    display: 'flex'
  },
  icon: {
    fontSize: '20px',
    paddingRight: '3px'
  },

  root: {
    fontSize:'14px',
    overflowY: 'auto',
    flex: '1 0 0',
    width: 'inherit !important',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&:-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
  },
  logItem: {
    padding: '8px 0px',
    borderBottom: '1px solid #d6d6d6'
  }
}));
const ListLogs = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModel] = useState({});
  const { listLogs, isFetching, isFinished, onFetching, onHashTagChange } = props;
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
  const handleOpen = data => {
    setDataModel(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => window.onresize = null;
  },[]);
  return (
    <div className={classes.root} id="listAct" onScroll={handleScroll}>
      <SimpleDialog data={dataModal} onClose={handleClose} open={open} />
      <ul>
        {listLogs
          ? listLogs.map((item, index) => (
            <LogItem
              className={classes.logItem}
              key={index}
              logItem={item}
              onHashTagChange={onHashTagChange}
              onOpen={handleOpen}
              stt={index}
            />
          ))
          : ''}
      </ul>
    </div>
  );
};

export default ListLogs;

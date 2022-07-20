/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ListTracking } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1',
  },
  container: {
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  }
}));

const ImportTracking = () => {
  const classes = useStyles();

  const [items, setItems] = useState([
    {
      id: '1',
      fileName: 'File Name 1',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
    {
      id: '2',
      fileName: 'File Name 2',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
    {
      id: '3',
      fileName: 'File Name 3',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
    {
      id: '4',
      fileName: 'File Name 4',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
    {
      id: '5',
      fileName: 'File Name 5',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
    {
      id: '6',
      fileName: 'File Name 6',
      lastModifiedTime: '2021-03-30 00:17:34',
      status: 'Pending'
    },
  ]);
  const [page, setPage] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleFetching = fetching => setIsFetching(fetching);
  const handleFinished = finished => setIsFinished(finished);

  return (
    <div className={classes.root}>
      <Paper
        className={classes.container}
        elevation={1}
        variant="outlined"
      >
        <ListTracking
          isFetching={isFetching}
          isFinished={isFinished}
          items={items}
          onFetching={handleFetching}
        />
        {isFetching &&  <div style={{textAlign:'center', color:'gray'}}>
            Loading.....
        </div>}
      </Paper>
    </div>
  );
};

ImportTracking.propTypes = {};

export default ImportTracking;

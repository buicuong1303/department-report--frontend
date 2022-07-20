/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { ListTracking } from './components';
import { v4 as uuid } from 'uuid';
import { getExportsTracking } from './ExportTracking.asyncActions';
import { clearStateTracking } from './ExportTracking.slice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    backgroundColor: '#ffffff'
  }
}));

const ExportTracking = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const listExportTracking = useSelector(state => state.export.tracking.exports);
  const recordLength = useSelector(state => state.export.tracking.recordLength);

  const [page, setPage] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [count, setCount] = useState(1);
  const handleFetching = fetching => setIsFetching(fetching);
  const handleFinished = finished => setIsFinished(finished);

  const fetchMoreListReports = async () => {
    const actionActivityResult = await dispatch(getExportsTracking({ count: count }));

    if (!actionActivityResult.error) {
      if (actionActivityResult.payload.listReport.length <= 0) {
        setIsFinished(true);
        setIsFetching(false);
      }else{
        setCount(count + 1);
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    // dispatch(getExportsTracking());
    fetchMoreListReports();
    return () => dispatch(clearStateTracking());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListReports();
    // eslint-disable-next-line
  }, [isFetching]);

  return (
    <div className={classes.root}>
      <ListTracking
        className={classes.container}
        isFetching={isFetching}
        isFinished={isFinished}
        listExportTracking={listExportTracking}
        onFetching={handleFetching}
        onFinished={handleFinished}
      />
      {isFetching &&  <div style={{textAlign:'center', color:'gray'}}>
            Loading...
      </div>}
    </div>
  );
};

ExportTracking.propTypes = {};

export default ExportTracking;

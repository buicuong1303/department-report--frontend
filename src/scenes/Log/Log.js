/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from 'react';
import ToolBar from './components/ToolBar';
import { Paper, makeStyles, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import ListLogs from './components/ListLog';
import { AuthGuard, Page } from 'components';
import Header from './components/Header';
import clsx from 'clsx';
import permissionAuth from 'utils/permissionAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityLog, getUserInApps } from './Log.asyncActions';
import apiStatus from 'utils/apiStatus';
import { clearStateActivityLog } from './Log.slice';
import { useSnackbar } from 'notistack';

const useStyle = makeStyles(theme => ({
  root: {
    fontSize:'14px',
    width: theme.breakpoints.values.lg,
    [theme.breakpoints.down('lg')]: {
      width: theme.breakpoints.values.lg
    },

    [theme.breakpoints.down('md')]: {
      width: theme.breakpoints.values.md
    },
    [theme.breakpoints.down('sm')]: {
      width: '370px',
      overflowY: 'auto'
    },
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    }
  },
  title: {
    color: theme.palette.primary.main
  },
  header: {
    display: 'flex',
    backgroundColor: '#c1c1c1',
    fontWeight: '500',
    color: 'black',
    height: '40px',
    justifyContent: 'center',
    zIndex: '1',
    opacity: '1'
  },
  headerItem: {
    textAlign: 'left',
    lineHeight: '40px',
    paddingLeft: '40px'
  },
  hidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
}));

const Log = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const status = useSelector(state => state.log.status);
  const message = useSelector(state => state.log.message);

  const [listLogs, setListLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilter] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [totalLogs, setTotalLogs] = useState(0);

  const showSnackbar = (message, status) => enqueueSnackbar(message, { variant: status });
  const handleFilter = data => {
    setListLogs([]);
    setIsFinished(false);
    setPage(1);
    setFilter({ ...filters, ...data });
  };
  const handleReset = () => {
    setListLogs([]);
    setPage(1);
    setFilter({});
    setIsFinished(false);
  };
  const handleHashTagChange  = (data) => {

    setListLogs([]);
    setPage(1);
    setFilter({...filters, hashTag: data});
  };
  const handleFetching = fetching => setIsFetching(fetching);
  const handleFinished = finished => setIsFinished(finished);

  let fetchMoreListLogs = async () => {
    const actionActivityResult = await dispatch(
      getActivityLog({ page, ...filters })
    );

    if (!actionActivityResult.error) {
      setTotalLogs(actionActivityResult.payload.count);

      if (actionActivityResult.payload.logs.length > 0) {
        setPage(page + 1);
        setListLogs(() => {
          const arr = [...listLogs, ...actionActivityResult.payload.logs];
          return arr;
        });

        var listActParent = document.querySelector('#listAct');
        var listActItem = document.querySelector('#listAct ul');

        if(listActParent && listActItem){
          if (listActParent.clientHeight >= listActItem.clientHeight) {
            setIsFetching(true);
          }
        }


      } else {
        setIsFinished(true);
      }
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMoreListLogs();

    const getUsersInApp = async () => {
      const actionUserResult = await dispatch(getUserInApps());
      if (!actionUserResult.error) setUsers(actionUserResult.payload);
    };
    getUsersInApp();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListLogs();
    // eslint-disable-next-line
  }, [isFetching]);

  useEffect(() => {
    if (!filters) return;
    fetchMoreListLogs();
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, message]);


  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      if (status !== apiStatus.PENDING) {
        setOpenBackdrop(false);
      }
    },500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearStateActivityLog());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AuthGuard requestPermissions={[permissionAuth.VIEW_ACTIVITY_LOG]}>
      <Page className={classes.root} title="Activity logs">
        <Header titleName="Activity logs" />
        <Divider className={classes.divider} />
        <Paper
          elevation={3}
          style={{
            padding: '8px 16px',
            display: 'flex',
            flexDirection: 'column',
            flex: '1'
          }}
          variant="outlined"
        >
          <ToolBar onFilter={handleFilter} onReset={handleReset} users={users}/>
          <div style={{ color: 'grey' }}>
            (Events: {listLogs.length}/{totalLogs})
          </div>
          <div className={classes.header}>
            <div className={classes.headerItem} style={{ flex: '2' }}>
              Date
            </div>
            <div
              className={clsx(classes.headerItem, classes.hidden)}
              style={{ flex: '2' }}
            >
              User IP
            </div>
            <div className={classes.headerItem} style={{ flex: '2' }}>
              User
            </div>
            <div
              className={clsx(classes.headerItem, classes.hidden)}
              style={{ flex: '2', paddingLeft: '30px' }}
            >
              Log type
            </div>
            <div className={classes.headerItem} style={{ flex: '3' }}>
              Title
            </div>
            <div
              className={clsx(classes.headerItem, classes.hidden)}
              style={{ flex: '1' }}
            />
            <div
              className={clsx(classes.headerItem, classes.hidden)}
              style={{ flex: '2' }}
            >
              Hashtag
            </div>
          </div>
          <ListLogs
            isFetching={isFetching}
            isFinished={isFinished}
            listLogs={listLogs}
            onFetching={handleFetching}
            onFinished={handleFinished}
            onHashTagChange = {handleHashTagChange}
          />
          {isFetching &&  <div style={{textAlign:'center', color:'gray'}}>
            Loading.....
          </div>}
        </Paper>
      </Page>
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AuthGuard>
  );
};

export default Log;

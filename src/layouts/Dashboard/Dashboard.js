import React, { Suspense, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { NavBar } from './components';
import { colors } from '@material-ui/core';
import { getUserInfo } from 'store/asyncActions/session.asyncAction';
import { clearStateSession, setSessionStatus } from 'store/slices/session.slice';
import { useDispatch, useSelector } from 'react-redux';
import apiStatus from 'utils/apiStatus';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: colors.blue
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    overflowY: 'hidden',
    flex: '1 1 auto'
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const { route } = props;
  const dispatch = useDispatch();
  const {isSetToken} = useSelector(state => state.session);
  useEffect(() => {
    dispatch(setSessionStatus(apiStatus.PENDING));

    const getUser = async () => {
      await dispatch(getUserInfo());
    };
    if (isSetToken) {
      getUser();
    }
    // eslint-disable-next-line
  }, [isSetToken]);

  useEffect(() => {
    return () => clearStateSession();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AuthGuard, Page } from '../../components';
import SideBar from './components/SideBar';
import { Backdrop, CircularProgress, Divider, Paper } from '@material-ui/core';
// import { useSnackbar } from 'notistack';
import { Header } from 'scenes/Configuration/components';
import BotBar from './components/BotBar';
import './DataCenter.style.scss';
import permissionAuth from 'utils/permissionAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getDepartments } from './Mixin.asynActions';
import validatePermission from 'utils/validatePermission';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xl')]: {
      width: theme.breakpoints.values.xl
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%'
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  container: {
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },

  btnAdd: {
    borderRadius: '3px !important',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: '40px',
    maxHeight: '40px'
  },
  title: {
    color: theme.palette.primary.main
  },
  sideBar: {
    margin: '10px 0px'
  },
  BotBar: {
    padding: '0 6px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
  },

  paper: {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey'
    },
    '&:-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    }
  }
}));

const DataCenter = () => {
  const classes = useStyles();

  const userPermissions = useSelector(state => state.session.userInfo.permissions);
  const status = useSelector(state => state.dataCenter.mixin.status);

  const [category, setCategory] = useState();
  const [openBackdrop, setOpenBackdrop] = useState(false);


  // const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   enqueueSnackbar('I love hooks', {
  //     variant: 'success',
  //     anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
  //   });
  // };
  const handleCategoryChange = category => setCategory(category);

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
    }, 500);

    // eslint-disable-next-line
  }, [status]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgents());
    dispatch(getDepartments());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (true) {
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_GLIP_DATA) !== -1:
        setCategory(0);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_EMAIL_DATA) !== -1:
        setCategory(1);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_EPIC_DATA) !== -1:
        setCategory(2);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_PHONE_DATA) !== -1:
        setCategory(3);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_INBOUND_CALL_DATA) !== -1:
        setCategory(4);
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_PUNCH_DATA) !== -1:
        setCategory(5);
        break;
      default:
    }
    // eslint-disable-next-line
  }, [userPermissions]);

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        'and',
        [
          permissionAuth.VIEW_ALL_GLIP_DATA,
          permissionAuth.VIEW_ALL_EMAIL_DATA,
          permissionAuth.VIEW_ALL_EPIC_DATA,
          permissionAuth.VIEW_ALL_PHONE_DATA,
          permissionAuth.VIEW_ALL_INBOUND_CALL_DATA,
          permissionAuth.VIEW_ALL_PUNCH_DATA
        ]
      ]}
    >
      <Page
        className={classes.root}
        title="Data center"
      >
        <Header
          className={classes.title}
          titleName="Data center"
        />
        <Divider className={classes.divider} />
        <Paper
          className={classes.paper}
          elevation={3}
          variant="outlined"
        >
          <SideBar
            canViewEmailData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_EMAIL_DATA])}
            canViewEpicData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_EPIC_DATA])}
            canViewGlipData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_GLIP_DATA])}
            canViewInboundCallData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_INBOUND_CALL_DATA])}
            canViewPhoneData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_PHONE_DATA])}
            canViewPunchData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_PUNCH_DATA])}
            className={classes.sideBar}
            onChange={handleCategoryChange}
            selected={category}
            userPermissions={userPermissions}
          />
          <BotBar
            canViewEmailData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_EMAIL_DATA])}
            canViewEpicData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_EPIC_DATA])}
            canViewGlipData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_GLIP_DATA])}
            canViewInboundCallData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_INBOUND_CALL_DATA])}
            canViewPhoneData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_PHONE_DATA])}
            canViewPunchData={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_PUNCH_DATA])}
            className={classes.BotBar}
            onChange={handleCategoryChange}
            selected={category}
          />
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

DataCenter.propTypes = {};

export default DataCenter;

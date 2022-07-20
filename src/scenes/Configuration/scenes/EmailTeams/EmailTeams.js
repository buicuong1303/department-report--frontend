import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { AuthGuard, CustomButton } from 'components';
import { AddCircle } from '@material-ui/icons';
import EmailTeam from './components/EmailTeam';
import CreateEmailTeam from './components/CreateEmailTeam/CreateEmailTeam';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEmailTeam,
  deleteEmailTeam,
  getEmailTeams,
  updateEmailTeam
} from './EmailTeams.asyncActions';
import apiStatus from 'utils/apiStatus';
import { useSnackbar } from 'notistack';
import { clearStateEmailTeam } from './EmailTeams.slice';
import permissionAuth from 'utils/permissionAuth';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '0px',
    display: 'flex',
    flexDirection: 'column',
    flex: '100%'
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#c1c1c1',
    padding: theme.spacing(1)
  },

  headerItem: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    margin: 'auto'
  },

  list: {
    height: '100%',
    overflow: 'auto',
    margin: '0px',
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

  icon: {
    marginRight: '5px'
  }
}));

const EmailTeams = props => {
  // eslint-disable-next-line
  const {
    setTitle,
    canCreateEmailTeam,
    canDeleteEmailTeam,
    canUpdateEmailTeam,
    // ...rest
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const status = useSelector(state => state.configuration.emailTeams.status);
  const error = useSelector(state => state.configuration.emailTeams.error);
  const message = useSelector(state => state.configuration.emailTeams.message);

  const backdrop = useSelector(
    state => state.configuration.emailTeams.backdrop
  );

  const emailTeams = useSelector(
    state => state.configuration.emailTeams.emailTeams
  );

  //* show notification
  const showSnackbar = (message, status) =>
    enqueueSnackbar(message, { variant: status });

  //* Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleToggleBackdrop = status => {
    if (status === apiStatus.PENDING) {
      setOpenBackdrop(true);
    } else {
      setTimeout(() => {
        if (status !== apiStatus.PENDING) {
          setOpenBackdrop(false);
        }
      }, 500);
    }
  };

  //* -------------- START HANDLE ACTION --------------
  //* handle get list email team
  const getEmailTeamsDispatch = () => {
    dispatch(getEmailTeams());
  };

  //* handle create email team
  const createEmailTeamDispatch = emailTeam => {
    dispatch(createEmailTeam({ emailTeam: emailTeam }));
  };

  //* handle update email team
  const updateEmailTeamDispatch = (id, emailTeam) => {
    dispatch(updateEmailTeam({ id: id, emailTeam: emailTeam }));
  };

  //* handle delete email team
  const deleteEmailTeamDispatch = id => {
    dispatch(deleteEmailTeam({ id: id }));
  };

  //* handle create email team
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreateEmailTeam = () => setOpenCreate(true);
  const handleCloseCreateEmailTeam = () => setOpenCreate(false);
  const handleSubmitCreateEmailTeam = emailTeam => {
    createEmailTeamDispatch(emailTeam);
  };
  //* --------------  END HANDLE ACTION  --------------

  //* ---------------  START USEEFFECT  ---------------
  useEffect(() => {
    setTitle('Manage Email Team');

    getEmailTeamsDispatch(); //* get list email team
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === apiStatus.SUCCESS) {
      showSnackbar(message, status);
      handleCloseCreateEmailTeam();
    }
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    handleToggleBackdrop(backdrop);

    // eslint-disable-next-line
  }, [backdrop]);

  useEffect(() => {
    return () => dispatch(clearStateEmailTeam()); //* clear state when unmount
    // eslint-disable-next-line
  }, []);
  //* ----------------  END USEEFFECT  ----------------

  //* UI
  return (
    <AuthGuard requestPermissions={[permissionAuth.VIEW_ALL_EMAIL_TEAM]}>
      <Paper className={classes.root} elevation={3}>
        <div className={classes.header}>
          <div className={classes.headerItem} style={{ flex: '1' }}>
            No
          </div>
          <div className={classes.headerItem} style={{ flex: '3' }}>
            Display Name
          </div>
          <div className={classes.headerItem} style={{ flex: '4' }}>
            Email Address
          </div>
          <div className={classes.headerItem} style={{ flex: '1' }}>
            Status
          </div>
          {(canCreateEmailTeam || canDeleteEmailTeam || canUpdateEmailTeam) && (
            <div style={{ flex: '2', textAlign: 'center' }}>
              {canCreateEmailTeam && (
                <CustomButton
                  content="Create new"
                  onClick={handleOpenCreateEmailTeam}
                  type="green"
                  variant="contained"
                >
                  <AddCircle className={classes.icon} />
                </CustomButton>
              )}
            </div>
          )}
        </div>

        <ul className={classes.list}>
          {emailTeams
            ? emailTeams.map((emailTeam, index) => (
              <EmailTeam
                canCreateEmailTeam={canCreateEmailTeam}
                canDeleteEmailTeam={canDeleteEmailTeam}
                canUpdateEmailTeam={canUpdateEmailTeam}
                deleteEmailTeamDispatch={deleteEmailTeamDispatch}
                emailTeam={emailTeam}
                key={index}
                no={index + 1}
                updateEmailTeamDispatch={updateEmailTeamDispatch}
              />
            ))
            : ''}
        </ul>

        {canCreateEmailTeam && (
          <CreateEmailTeam
            handleCloseCreateEmailTeam={handleCloseCreateEmailTeam}
            handleSubmitCreateEmailTeam={handleSubmitCreateEmailTeam}
            openCreate={openCreate}
          />
        )}

        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </AuthGuard>
  );
};

EmailTeams.propTypes = {
  canCreateEmailTeam: PropTypes.bool,
  canDeleteEmailTeam: PropTypes.bool,
  canUpdateEmailTeam: PropTypes.bool,
  setTitle: PropTypes.func.isRequired
};

export default EmailTeams;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, Paper } from '@material-ui/core';
import { Header, NavPie } from './components';
import Agents from './scenes/Agents';
import Departments from './scenes/Departments';
import EmailTeams from './scenes/EmailTeams';
import Logics from './scenes/Logics';
import { AuthGuard, Page } from 'components';
import permissionAuth from 'utils/permissionAuth';
import { useSelector } from 'react-redux';
import validatePermission from 'utils/validatePermission';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:'14px',
    position:'relative',
    width: theme.breakpoints.values.lg,
    [theme.breakpoints.down('lg')]: {
      width: theme.breakpoints.values.lg
    },

    [theme.breakpoints.down('md')]: {
      width: theme.breakpoints.values.md
    },

    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
  },

  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Configuration = () => {
  const classes = useStyles();

  const userPermissions = useSelector(state => state.session.userInfo.permissions);

  const [title, setTitle] = useState('');
  const [active, setActive] = useState('');

  useEffect(() => {
    switch (true) {
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_DEPARTMENT) !== -1:
        setTitle('Manage Department');
        setActive('departments');
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_AGENT) !== -1:
        setTitle('Manage Agent');
        setActive('agents');
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_EMAIL_TEAM) !== -1:
        setTitle('Manage Email Team');
        setActive('emailTeams');
        break;
      case userPermissions.indexOf(permissionAuth.VIEW_ALL_LOGIC) !== -1:
        setTitle('Manage Logic');
        setActive('logics');
        break;
      default:
    }
    // eslint-disable-next-line
  }, [userPermissions]);

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        'or',
        [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_DEPARTMENT, permissionAuth.VIEW_AGENTS_OF_DEPARTMENT],
        [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_AGENT, permissionAuth.VIEW_DEPARTMENTS_OF_AGENT],
        [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_EMAIL_TEAM],
        [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_LOGIC],
      ]}
    >
      <Page
        className={classes.root}
        title={title}
      >
        <Header
          className={classes.title}
          titleName={title}
        />

        <Divider className={classes.divider} />

        <Paper
          className={classes.container}
          elevation={3}
          variant="outlined"
        >
          {
            active === 'departments' &&
            <Departments
              canCreateDepartment={!validatePermission(userPermissions, [permissionAuth.CREATE_DEPARTMENT])}
              canDeleteDepartment={!validatePermission(userPermissions, [permissionAuth.DELETE_DEPARTMENT])}
              canUpdateDepartment={!validatePermission(userPermissions, [permissionAuth.UPDATE_DEPARTMENT])}
              setTitle={setTitle}
            />
          }
          {
            active === 'agents' &&
            <Agents
              canCreateAgent={!validatePermission(userPermissions, [permissionAuth.CREATE_AGENT])}
              canDeleteAgent={!validatePermission(userPermissions, [permissionAuth.DELETE_AGENT])}
              canUpdateAgent={!validatePermission(userPermissions, [permissionAuth.UPDATE_AGENT])}
              setTitle={setTitle}
            />
          }
          {
            active === 'emailTeams' &&
            <EmailTeams
              canCreateEmailTeam={!validatePermission(userPermissions, [permissionAuth.CREATE_EMAIL_TEAM])}
              canDeleteEmailTeam={!validatePermission(userPermissions, [permissionAuth.DELETE_EMAIL_TEAM])}
              canUpdateEmailTeam={!validatePermission(userPermissions, [permissionAuth.UPDATE_EMAIL_TEAM])}
              setTitle={setTitle}
            />
          }
          {
            active === 'logics' &&
            <Logics
              canCreateLogic={!validatePermission(userPermissions, [permissionAuth.CREATE_LOGIC])}
              canDeleteLogic={!validatePermission(userPermissions, [permissionAuth.DELETE_LOGIC])}
              canUpdateLogic={!validatePermission(userPermissions, [permissionAuth.UPDATE_LOGIC])}
              setTitle={setTitle}
            />
          }

          <NavPie
            active={active}
            canViewAgent={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_AGENT])}
            canViewDepartment={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_DEPARTMENT])}
            canViewEmailTeam={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_EMAIL_TEAM])}
            canViewLogic={!validatePermission(userPermissions, [permissionAuth.VIEW_ALL_LOGIC])}
            setActive={setActive}
          />
        </Paper>
      </Page>
    </AuthGuard>
  );
};

Configuration.propTypes = {};

export default Configuration;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { AuthGuard, CustomButton } from 'components';
import { AddCircle } from '@material-ui/icons';
import Department from './components/Department';
import CreateDepartment from './components/CreateDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearStateDepartment } from './Departments.slice';
import apiStatus from 'utils/apiStatus';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment
} from './Departments.asyncActions';
import { getAgents } from '../Agents/Agents.asyncActions';
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

const Departments = props => {
  // eslint-disable-next-line
  const {
    setTitle,
    canCreateDepartment,
    canDeleteDepartment,
    canUpdateDepartment,
    // ...rest
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const status = useSelector(state => state.configuration.departments.status);
  const error = useSelector(state => state.configuration.departments.error);
  const message = useSelector(state => state.configuration.departments.message);

  const backdrop = useSelector(
    state => state.configuration.departments.backdrop
  );

  const departments = useSelector(
    state => state.configuration.departments.departments
  );
  const agents = useSelector(state => state.configuration.agents.agents);

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
  const getDepartmentsDispatch = () => {
    dispatch(getDepartments());
  };

  //* handle create email team
  const createDepartmentDispatch = department => {
    const newDepartment = {
      ...department,
      name: department.name.trim()
    };
    dispatch(createDepartment({ department: newDepartment }));
  };

  //* handle update email team
  const updateDepartmentDispatch = (id, department) => {
    dispatch(updateDepartment({ id: id, department: department }));
  };

  //* handle delete email team
  const deleteDepartmentDispatch = id => {
    dispatch(deleteDepartment({ id: id }));
  };

  const getAgentsDispatch = () => {
    dispatch(getAgents());
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreateDepartment = () => setOpenCreate(true);
  const handleCloseCreateDepartment = () => setOpenCreate(false);
  const handleSubmitCreateDepartment = department => {
    createDepartmentDispatch(department);
    setOpenCreate(false);
  };
  //* --------------  END HANDLE ACTION  --------------

  //* ---------------  START USEEFFECT  ---------------
  useEffect(() => {
    setTitle('Manage Department');

    getDepartmentsDispatch();
    getAgentsDispatch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === apiStatus.SUCCESS) showSnackbar(message, status);
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    handleToggleBackdrop(backdrop);

    // eslint-disable-next-line
  }, [backdrop]);

  useEffect(() => {
    return () => {
      dispatch(clearStateDepartment()); //* clear state when unmount
    };
    // eslint-disable-next-line
  }, []);
  //* ----------------  END USEEFFECT  ----------------

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        permissionAuth.VIEW_ALL_DEPARTMENT,
        permissionAuth.VIEW_AGENTS_OF_DEPARTMENT
      ]}
    >
      <Paper
        className={classes.root}
        elevation={3}
      >
        <div className={classes.header}>
          <div
            className={classes.headerItem}
            style={{ flex: '1' }}
          >
            No
          </div>
          <div
            className={classes.headerItem}
            style={{ flex: '3' }}
          >
            Department
          </div>
          <div
            className={classes.headerItem}
            style={{ flex: '3' }}
          >
            Agents
          </div>
          <div
            className={classes.headerItem}
            style={{ flex: '1' }}
          >
            Status
          </div>
          {(canCreateDepartment ||
            canDeleteDepartment ||
            canUpdateDepartment) && (
            <div style={{ flex: '3', textAlign: 'center' }}>
              {canCreateDepartment && (
                <CustomButton
                  content="Create new"
                  onClick={handleOpenCreateDepartment}
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
          {departments
            ? departments.map((department, index) => (
              <Department
                agents={agents}
                canCreateDepartment={canCreateDepartment}
                canDeleteDepartment={canDeleteDepartment}
                canUpdateDepartment={canUpdateDepartment}
                deleteDepartmentDispatch={deleteDepartmentDispatch}
                department={department}
                key={index}
                no={index + 1}
                updateDepartmentDispatch={updateDepartmentDispatch}
              />
            ))
            : ''}
        </ul>

        {canCreateDepartment && (
          <CreateDepartment
            agents={agents}
            handleCloseCreateDepartment={handleCloseCreateDepartment}
            handleSubmitCreateDepartment={handleSubmitCreateDepartment}
            openCreate={openCreate}
          />
        )}

        <Backdrop
          className={classes.backdrop}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </AuthGuard>
  );
};

Departments.propTypes = {
  canCreateDepartment: PropTypes.bool,
  canDeleteDepartment: PropTypes.bool,
  canUpdateDepartment: PropTypes.bool,
  setTitle: PropTypes.func.isRequired
};

export default Departments;

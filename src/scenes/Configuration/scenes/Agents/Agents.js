import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { AuthGuard, CustomButton } from 'components';
import {
  AddCircle
  // ArrowBackIos, ArrowForwardIos,
  // Cancel,
  // Delete,
  // Edit,
  // Publish,
  // ReportProblem,
  // Save,
  // SyncProblem,
} from '@material-ui/icons';
import Agent from './components/Agent';
import CreateAgent from './components/CreateAgent';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent
} from './Agents.asyncActions';
import { getDepartments } from '../Departments/Departments.asyncActions';
import apiStatus from 'utils/apiStatus';
import { useSnackbar } from 'notistack';
import { clearStateAgent } from './Agents.slice';
import permissionAuth from 'utils/permissionAuth';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { cloneDeep } from 'lodash';

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
    paddingLeft: theme.spacing(1),
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

const Agents = props => {
  // eslint-disable-next-line
  const {
    setTitle,
    canCreateAgent,
    canDeleteAgent,
    canUpdateAgent,
    // ...rest
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const status = useSelector(state => state.configuration.agents.status);
  const error = useSelector(state => state.configuration.agents.error);
  const message = useSelector(state => state.configuration.agents.message);

  const backdrop = useSelector(state => state.configuration.agents.backdrop);

  const agents = useSelector(state => state.configuration.agents.agents);
  const departments = useSelector(
    state => state.configuration.departments.departments
  );

  const more = 20;
  let numberRecord = useRef(more);
  let [agentsShow, setAgentsShow] = useState([]);
  useEffect(() => {
    setAgentsShow(cloneDeep(agents).splice(0, numberRecord.current));
  }, [agents]);

  const loadMore = more => {
    numberRecord.current += more;
    setAgentsShow(cloneDeep(agents).splice(0, numberRecord.current));
    let agentsList = document.querySelector('#agentsList');
    let agentItem = document.querySelector('#agentsList li');
    if (
      agentsList.clientHeight >=
      agentItem.clientHeight * numberRecord.current
    )
      loadMore(more);
  };

  window.onresize = function onresize() {
    let agentsList = document.querySelector('#agentsList');
    let agentItem = document.querySelector('#agentsList li');
    if (
      agentsList.clientHeight >=
      agentItem.clientHeight * numberRecord.current
    )
      loadMore(more);
  };

  function handleScroll() {
    let agentsList = document.querySelector('#agentsList');
    if (
      Math.ceil(agentsList.scrollTop) + agentsList.clientHeight >=
      agentsList.scrollHeight
    )
      loadMore(more);
  }

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
  const getAgentsDispatch = () => {
    dispatch(getAgents());
  };

  //* handle create email team
  const createAgentDispatch = agent => {
    dispatch(createAgent({ agent: agent }));
  };

  //* handle update email team
  const updateAgentDispatch = (id, agent) => {
    dispatch(updateAgent({ id: id, agent: agent }));
  };

  //* handle delete email team
  const deleteAgentDispatch = id => {
    dispatch(deleteAgent({ id: id }));
  };

  const getDepartmentsDispatch = () => {
    dispatch(getDepartments());
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreateAgent = () => {
    setOpenCreate(true);
  };
  const handleCloseCreateAgent = () => {
    setOpenCreate(false);
  };
  const handleSubmitCreateAgent = agent => {
    createAgentDispatch(agent);
  };
  //* --------------  END HANDLE ACTION  --------------

  //* ---------------  START USEEFFECT  ---------------
  useEffect(() => {
    handleToggleBackdrop(backdrop);

    // eslint-disable-next-line
  }, [backdrop]);

  useEffect(() => {
    setTitle('Manage Agents');

    getAgentsDispatch();
    getDepartmentsDispatch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === apiStatus.SUCCESS) {
      showSnackbar(message, status);
      handleCloseCreateAgent();
    }
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    return () => {
      window.onresize = null; //* clear onresize function
      dispatch(clearStateAgent()); //* clear state when unmount
    };
    // eslint-disable-next-line
  }, []);
  //* ----------------  END USEEFFECT  ----------------

  //* UI
  return (
    <AuthGuard
      requestPermissions={[
        permissionAuth.VIEW_ALL_AGENT,
        permissionAuth.VIEW_DEPARTMENTS_OF_AGENT
      ]}
    >
      <Paper className={classes.root} elevation={3}>
        <div className={classes.header}>
          <div className={classes.headerItem} style={{ flex: '1' }}>
            No
          </div>
          <div className={classes.headerItem} style={{ flex: '5' }}>
            First Name
          </div>
          <div className={classes.headerItem} style={{ flex: '3' }}>
            Last Name
          </div>
          <div className={classes.headerItem} style={{ flex: '5' }}>
            First Name Special
          </div>
          <div className={classes.headerItem} style={{ flex: '6' }}>
            Original Name
          </div>
          <div className={classes.headerItem} style={{ flex: '4' }}>
            Departments
          </div>
          <div className={classes.headerItem} style={{ flex: '2' }}>
            Is Primary
          </div>
          <div className={classes.headerItem} style={{ flex: '2' }}>
            Status
          </div>
          {(canCreateAgent || canDeleteAgent || canUpdateAgent) && (
            <div style={{ flex: '6', textAlign: 'center' }}>
              {canCreateAgent && (
                <CustomButton
                  content="Create new"
                  onClick={handleOpenCreateAgent}
                  type="green"
                  variant="contained"
                >
                  <AddCircle className={classes.icon} />
                </CustomButton>
              )}
              {/* <br></br><CustomButton type="green-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="green" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="green-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="green-full-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="green-full" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="green-full-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <br></br><CustomButton type="blue-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="blue" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="blue-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="blue-full-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="blue-full" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="blue-full-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <br></br><CustomButton type="orange-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="orange" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="orange-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="orange-full-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="orange-full" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="orange-full-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <br></br><CustomButton type="red-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="red" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="red-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="red-full-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="red-full" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="red-full-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <br></br><CustomButton type="gray-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="gray" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="gray-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="gray-full-bright" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="gray-full" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <CustomButton type="gray-full-dark" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton>
              <br></br><CustomButton type="" content="Test" variant="contained" > <AddCircle className={classes.icon}></AddCircle></CustomButton> */}
            </div>
          )}
        </div>
        <ul className={classes.list} id="agentsList" onScroll={handleScroll}>
          {agentsShow
            ? agentsShow.map((agent, index) => (
              <Agent
                agent={agent}
                canCreateAgent={canCreateAgent}
                canDeleteAgent={canDeleteAgent}
                canUpdateAgent={canUpdateAgent}
                deleteAgentDispatch={deleteAgentDispatch}
                departments={departments}
                key={index}
                no={index + 1}
                updateAgentDispatch={updateAgentDispatch}
              />
            ))
            : ''}
        </ul>
        {canCreateAgent && (
          <CreateAgent
            departments={departments}
            handleCloseCreateAgent={handleCloseCreateAgent}
            handleSubmitCreateAgent={handleSubmitCreateAgent}
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

Agents.propTypes = {
  canCreateAgent: PropTypes.bool,
  canDeleteAgent: PropTypes.bool,
  canUpdateAgent: PropTypes.bool,
  setTitle: PropTypes.func.isRequired
};

export default Agents;

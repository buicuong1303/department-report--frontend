import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Edit, Delete, CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { CustomButton, DialogDelete } from 'components';
import UpdateAgent from '../UpdateAgent/UpdateAgent';
import entityStatus from 'utils/entityStatus';
import apiStatus from 'utils/apiStatus';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  fileItem: {
    borderBottom: '1px solid #d2d2d2',
    display: 'flex',
    alignItems:'center',
    padding: theme.spacing(1),
    transition: 'all 1s',
    '&:hover': {
      backgroundColor: '#e7e7e7',
    },
    color: '#c1c1c1',
  },

  fileItemActive: {
    borderBottom: '1px solid #d2d2d2',
    display: 'flex',
    alignItems:'center',
    padding: theme.spacing(1),
    transition: 'all 1s',
    '&:hover': {
      backgroundColor: '#e7e7e7',
    }
  },

  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#d2d2d2',
  },

  dataItemList: {
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    height: '120px',
    listStyle: 'none',
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
  },

  listDepartment: {
    height: '120px',
    listStyle: 'none',
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}));

const Agent = (props) => {
  // eslint-disable-next-line
  const { agent, canCreateAgent, canDeleteAgent, canUpdateAgent, deleteAgentDispatch, departments, no, updateAgentDispatch, ...rest} = props;

  const classes = useStyles();
  const status = useSelector(state => state.configuration.agents.status);
  const error = useSelector(state => state.configuration.agents.error);

  //* Dialog Delete
  const [dialogDeleteValue, setDialogDeleteValue] = useState({ open: false, id: '', title: '', message: '' });
  const handleOpenDialogDelete = (id, title, message) => setDialogDeleteValue({ open: true, id: id, title: title, message: message });
  const handleCloseDialogDelete = () => setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  const handleSubmitDialogDelete = () => {
    deleteAgentDispatch(dialogDeleteValue.id);
    setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  };

  //* Update Form
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdateAgent = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdateAgent = () => setOpenUpdate(false);
  const handleSubmitUpdateAgent = (id, data) => {
    updateAgentDispatch(id, data);
  };

  //* Handle Delete
  const handleDeleteAgent = (id, name) => handleOpenDialogDelete(
    id,
    `Do you really want to delete agent '${name}'`,
    'Delete agent will set agent disable, you can\'t find it in this feature'
  );
  useEffect(() => {
    if (status === apiStatus.SUCCESS) {
      handleCloseUpdateAgent();
    }
    // eslint-disable-next-line
  }, [status, error]);
  //* UI
  return (
    <li className={agent.status === entityStatus.ACTIVE ? classes.fileItemActive : classes.fileItem}>
      <div style={{ flex: '1', paddingLeft: '8px'}} > {no} </div>
      <div style={{ flex: '5', paddingLeft: '8px'}} > {agent.firstName} </div>
      <div style={{ flex: '3', paddingLeft: '8px'}} > {agent.lastName} </div>
      <div style={{ flex: '5', paddingLeft: '8px'}} > {agent.firstNameSpecial} </div>
      <div style={{ flex: '6', paddingLeft: '8px'}} > {agent.originalName} </div>
      <div
        className={classes.dataItemList}
        style={{ flex: '4' }}
      >
        <ul className={classes.listDepartment}>
          {
            agent.departments.map((item, index) => {
              return <li key={index} >{item.name}</li>;
            })
          }
        </ul>
      </div>
      <div style={{ flex: '2', paddingLeft: '8px'}} > {agent.isPrimary === true ? <CheckBox style={{color: '#2b8432'}} /> : <CheckBoxOutlineBlank style={{color: '#c1c1c1'}}/>} </div>
      <div style={{ flex: '2', paddingLeft: '8px'}} > {agent.status === entityStatus.ACTIVE ? <span style={{color: '#2b8432'}}>{agent.status}</span> : <span>{agent.status}</span>} </div>
      {
        (canCreateAgent || canDeleteAgent || canUpdateAgent) &&
        <div style={{ flex: '6', textAlign: 'center' }} >
          {
            canUpdateAgent &&
            <CustomButton
              onClick={handleOpenUpdateAgent}
              style={{padding: '0px', minWidth: '50px'}}
              type="blue"
            >
              <Edit className={classes.iconEdit} />
            </CustomButton>
          }

          {
            canDeleteAgent &&
            <CustomButton
              onClick={() => handleDeleteAgent(agent.id, agent.fullName)}
              style={{padding: '0px', minWidth: '50px'}}
              type="red"
            >
              <Delete className={classes.iconDelete} />
            </CustomButton>
          }
        </div>
      }
      {
        canDeleteAgent &&
        <UpdateAgent
          agent={agent}
          departments={departments}
          handleCloseUpdateAgent={handleCloseUpdateAgent}
          handleSubmitUpdateAgent={handleSubmitUpdateAgent}
          openUpdate={openUpdate}
        />
      }

      {
        canUpdateAgent &&
        <DialogDelete
          handleClose={handleCloseDialogDelete}
          handleConfirm={handleSubmitDialogDelete}
          message={dialogDeleteValue.message}
          open={dialogDeleteValue.open}
          title={dialogDeleteValue.title}
        />
      }
    </li>
  );
};

Agent.propTypes = {
  agent: PropTypes.object,
  canCreateAgent: PropTypes.bool,
  canDeleteAgent: PropTypes.bool,
  canUpdateAgent: PropTypes.bool,
  deleteAgentDispatch: PropTypes.func,
  departments: PropTypes.array,
  no: PropTypes.number,
  updateAgentDispatch: PropTypes.func,
};

export default Agent;

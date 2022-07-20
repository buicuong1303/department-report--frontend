import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { CustomButton, DialogDelete } from 'components';
import UpdateDepartment from '../UpdateDepartment';
import entityStatus from 'utils/entityStatus';

const useStyles = makeStyles((theme) => ({
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

  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#d2d2d2',
  },

  dataItemList: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
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

  listAgent: {
    height: '120px',
    listStyle: 'none',
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}));

const Department = (props) => {
  // eslint-disable-next-line
  const { canCreateDepartment, canDeleteDepartment, canUpdateDepartment, department, agents, no, deleteDepartmentDispatch, updateDepartmentDispatch, ...rest} = props;
  const classes = useStyles();

  //* Dialog Delete
  const [dialogDeleteValue, setDialogDeleteValue] = useState({ open: false, id: '', title: '', message: '' });
  const handleOpenDialogDelete = (id, title, message) => setDialogDeleteValue({ open: true, id: id, title: title, message: message });
  const handleCloseDialogDelete = () => setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  const handleSubmitDialogDelete = () => {
    deleteDepartmentDispatch(dialogDeleteValue.id);
    setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  };

  //* Update Form
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdateDepartment = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdateDepartment = () => setOpenUpdate(false);
  const handleSubmitUpdateDepartment = (id, data) => {
    const newData = {
      ...data,
      name: data.name.trim()
    };
    updateDepartmentDispatch(id, newData);
    setOpenUpdate(false);
  };

  //* Handle Delete
  const handleDeleteDepartment = (id, name) => handleOpenDialogDelete(
    id,
    `Do you really want to delete department '${name}'`,
    'Delete department will set department disable, you can\'t find it in this feature'
  );

  //* UI
  return (
    <li className={department.status === entityStatus.ACTIVE ? classes.fileItemActive : classes.fileItem}>
      <div style={{ flex: '1', paddingLeft: '32px' }} > {no} </div>
      <div style={{ flex: '3', paddingLeft: '32px' }} > {department.name} </div>
      <div
        className={classes.dataItemList}
        style={{ flex: '3', paddingLeft: '32px' }}
      >
        <ul className={classes.listAgent}>
          {
            department.agents.map((item, index) => {
              return <li key={index} >{item.firstName} {item.lastName}</li>;
            })
          }
        </ul>
      </div>
      <div style={{ flex: '1', paddingLeft: '32px' }} > {department.status === entityStatus.ACTIVE ? <span style={{color: '#2b8432'}}>{department.status}</span> : <span>{department.status}</span>} </div>
      {
        (canCreateDepartment || canDeleteDepartment || canUpdateDepartment) &&
        <div style={{ flex: '3', textAlign: 'center' }} >
          {
            canUpdateDepartment &&
            <CustomButton
              onClick={handleOpenUpdateDepartment}
              style={{padding: '0px', minWidth: '50px'}}
              type="blue"
            >
              <Edit className={classes.iconEdit} />
            </CustomButton>
          }
          {
            canDeleteDepartment &&
            <CustomButton
              onClick={() => handleDeleteDepartment(department.id, department.name)}
              style={{padding: '0px', minWidth: '50px'}}
              type="red"
            >
              <Delete className={classes.iconDelete} />
            </CustomButton>
          }
        </div>
      }

      {
        canUpdateDepartment &&
        <UpdateDepartment
          agents={agents}
          department={department}
          handleCloseUpdateDepartment={handleCloseUpdateDepartment}
          handleSubmitUpdateDepartment={handleSubmitUpdateDepartment}
          openUpdate={openUpdate}
        />
      }

      {
        canUpdateDepartment &&
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

Department.propTypes = {
  agents: PropTypes.array,
  canCreateDepartment: PropTypes.bool,
  canDeleteDepartment: PropTypes.bool,
  canUpdateDepartment: PropTypes.bool,
  deleteDepartmentDispatch: PropTypes.func,
  department: PropTypes.object,
  no: PropTypes.number,
  updateDepartmentDispatch: PropTypes.func,
};

export default Department;

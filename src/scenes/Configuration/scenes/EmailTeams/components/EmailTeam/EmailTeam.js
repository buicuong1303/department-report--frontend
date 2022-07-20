import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { CustomButton, DialogDelete } from 'components';
import UpdateEmailTeam from '../UpdateEmailTeam';
import entityStatus from 'utils/entityStatus';
import apiStatus from 'utils/apiStatus';
import { useSelector } from 'react-redux';

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

  dataItem: {
    paddingLeft: theme.spacing(4),
    textAlign: 'left',
  },
}));

const EmailTeam = (props) => {
  // eslint-disable-next-line
  const { canCreateEmailTeam, canDeleteEmailTeam, canUpdateEmailTeam, emailTeam, no, deleteEmailTeamDispatch, updateEmailTeamDispatch, ...rest} = props;
  const status = useSelector(state => state.configuration.emailTeams.status);
  const error = useSelector(state => state.configuration.emailTeams.error);
  const classes = useStyles();

  //* Dialog Delete
  const defaultDeleteValue = { open: false, id: '', title: '', message: '' };
  const [dialogDeleteValue, setDialogDeleteValue] = useState(defaultDeleteValue);
  const handleOpenDialogDelete = (id, title, message) => setDialogDeleteValue({ open: true, id: id, title: title, message: message });
  const handleCloseDialogDelete = () => setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  const handleSubmitDialogDelete = () => {
    deleteEmailTeamDispatch(dialogDeleteValue.id);
    setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  };

  //* Update Form
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdateEmailTeam = () => setOpenUpdate(true);
  const handleCloseUpdateEmailTeam = () => setOpenUpdate(false);
  const handleSubmitUpdateEmailTeam = (id, emailTeam) => {
    updateEmailTeamDispatch(id, emailTeam);
  };

  //* Handle Delete
  const handleDeleteEmailTeam = (id, name) => handleOpenDialogDelete(
    id,
    `Do you really want to delete email team '${name}'`,
    'Delete email team will set email team disable, you can\'t find it in this feature'
  );
  useEffect(() => {
    if (status === apiStatus.SUCCESS) {
      handleCloseUpdateEmailTeam();
    }
    // eslint-disable-next-line
  }, [status, error]);

  //* UI
  return (
    <li className={emailTeam.status === entityStatus.ACTIVE ? classes.fileItemActive : classes.fileItem}>
      <div
        className={classes.dataItem}
        style={{ flex: '1' }}
      > {no} </div>
      <div
        className={classes.dataItem}
        style={{ flex: '3' }}
      > {emailTeam.displayName} </div>
      <div
        className={classes.dataItem}
        style={{ flex: '4' }}
      > {emailTeam.emailAddress} </div>
      <div
        className={classes.dataItem}
        style={{ flex: '1' }}
      > {emailTeam.status === entityStatus.ACTIVE ? <span style={{color: '#2b8432'}}>{emailTeam.status}</span> : <span>{emailTeam.status}</span>} </div>
      {
        (canCreateEmailTeam || canDeleteEmailTeam || canUpdateEmailTeam) &&
        <div style={{ flex: '2', textAlign: 'center' }} >
          {
            canUpdateEmailTeam &&
            <CustomButton
              onClick={handleOpenUpdateEmailTeam}
              style={{padding: '0px', minWidth: '50px'}}
              type="blue"
            >
              <Edit className={classes.iconEdit} />
            </CustomButton>
          }

          {
            canDeleteEmailTeam &&
            <CustomButton
              onClick={() => handleDeleteEmailTeam(emailTeam.id, emailTeam.displayName)}
              style={{padding: '0px', minWidth: '50px'}}
              type="red"
            >
              <Delete className={classes.iconDelete} />
            </CustomButton>
          }
        </div>
      }

      {
        canDeleteEmailTeam &&
        <UpdateEmailTeam
          emailTeam={emailTeam}
          handleCloseUpdateEmailTeam={handleCloseUpdateEmailTeam}
          handleSubmitUpdateEmailTeam={handleSubmitUpdateEmailTeam}
          openUpdate={openUpdate}
        />
      }

      {
        canUpdateEmailTeam &&
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

EmailTeam.propTypes = {
  canCreateEmailTeam: PropTypes.bool,
  canDeleteEmailTeam: PropTypes.bool,
  canUpdateEmailTeam: PropTypes.bool,
  deleteEmailTeamDispatch: PropTypes.func,
  emailTeam: PropTypes.object,
  no: PropTypes.number,
  updateEmailTeamDispatch: PropTypes.func,
};

export default EmailTeam;

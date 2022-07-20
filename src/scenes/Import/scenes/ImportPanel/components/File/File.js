import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Fade, makeStyles } from '@material-ui/core';
import { Delete, SyncProblem, ReportProblem, CheckBox, Publish } from '@material-ui/icons';
import { CustomButton, DialogConfirm, DialogDelete } from 'components';
import processStatus from 'utils/processStatus';

const useStyles = makeStyles(theme => ({
  fileItem: {
    borderBottom: '1px solid #d2d2d2',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    transition: 'all 1s',
    '&:hover': {
      backgroundColor: '#e7e7e7'
    }
  },

  header: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#d2d2d2'
  },

  dataItem: {
    paddingLeft: theme.spacing(4),
    textAlign: 'left'
  },

  listDepartment: {
    listStyle: 'none',
    maxHeight: '130px',
    overflowY: 'auto',
  },

  icon: {
    marginRight: '5px'
  }
}));

const File = props => {
  // eslint-disable-next-line
  const { file, no, handleValidateFile, handleRemoveFile, handleOpenDetailError, handleUploadFile, loading, ...rest} = props;

  const classes = useStyles();

  //* Dialog Delete
  const defaultDialogDeleteValue = { open: false, id: '', title: '', message: '' };
  const [dialogDeleteValue, setDialogDeleteValue] = useState(defaultDialogDeleteValue);
  const handleOpenDialogDelete = (id, title, message) => setDialogDeleteValue({ open: true, id: id, title: title, message: message });
  const handleCloseDialogDelete = () => setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  const handleSubmitDialogDelete = () => {
    handleRemoveFile(dialogDeleteValue.id);
    setDialogDeleteValue({ ...dialogDeleteValue, open: false });
  };

  //* Handle Delete
  const handleDeleteFile = (id, name) => handleOpenDialogDelete(
    id,
    `Do you really want to delete file '${name}'`,
    'Delete file will set file disable, you can\'t find it in this feature'
  );

  //* Dialog Confirm
  const defaultDialogConfirmValue = { open: false, id: '', type: '', message: '' };
  const [dialogConfirmValue, setDialogConfirmValue] = useState(defaultDialogConfirmValue);
  const handleOpenDialogConfirm = (id, type, message) => setDialogConfirmValue({ open: true, id: id, type: type, message: message });
  const handleCloseDialogConfirm = () => setDialogConfirmValue(defaultDialogConfirmValue);
  const handleSubmitDialogConfirm = () => {
    handleUploadFile(dialogConfirmValue.id, dialogConfirmValue.type);
    setDialogConfirmValue({ ...dialogConfirmValue, open: false });
  };

  //* Handle Confirm
  const handleConfirmUpload = (id, type, name) => handleOpenDialogConfirm(
    id,
    type,
    `Do you really want to upload file '${name}'`
  );
  //* UI
  return (
    <li
      className={classes.fileItem}
      style={(file.status === processStatus.SUCCESS || file.status === processStatus.ERROR) ? {opacity: '.5'} : {}}
    >
      <div
        className={classes.dataItem}
        style={{ flex: '1' }}
      >
        {no}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '3' }}
      >
        {file.fileName}
      </div>
      <div
        className={classes.dataItem}
        style={{ flex: '1' }}
      >
        {file.size}
      </div>
      <div style={{ flex: '3', display: 'flex', justifyContent: 'center' }}>
        {
          file.loading ? (
            <div style={{ display: 'flex', alignItems: 'center', minWidth: '140px', margin: '0px 8px' }}>
              <Fade
                in
                style={{ margin: 'auto', width: '25px', height: '25px' }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
            </div>
          ): file.status === processStatus.NEED_VALIDATE ? (
            <CustomButton
              content="Check"
              disabled={loading}
              onClick={() => handleValidateFile(file.id, file.type)}
              style={{ minWidth: '140px' }}
              type="orange"
              variant="contained"
            >
              <SyncProblem className={classes.icon} />
            </CustomButton>
          ) : file.status === processStatus.INVALID ? (
            <CustomButton
              content="Detail Error"
              onClick={() => handleOpenDetailError(file.fileName, file.dataError)}
              style={{ minWidth: '140px' }}
              type="red-bright"
              variant="contained"
            >
              <ReportProblem className={classes.icon} />
            </CustomButton>
          ) : file.status === processStatus.WARNINGVALID ? (
            <CustomButton
              content="Detail Warning"
              onClick={() => handleOpenDetailError(file.fileName, file.dataError)}
              style={{ minWidth: '140px' }}
              type="orange-bright"
              variant="contained"
            >
              <ReportProblem className={classes.icon} />
            </CustomButton>
          ) : file.status === processStatus.VALID ? (
            <CustomButton
              content="Valid Data"
              style={{ border: 'unset', cursor: 'unset', backgroundColor: 'unset', color: '#2b8432', minWidth: '140px' }}
              type=""
              variant="contained"
            >
              <CheckBox className={classes.icon} />
            </CustomButton>
          ) : file.status === processStatus.NEED_UPLOAD ? (
            <CustomButton
              content="Upload"
              disabled={loading}
              onClick={() => handleConfirmUpload(file.id, file.type, file.fileName)}
              style={{ minWidth: '140px' }}
              type="green"
              variant="contained"
            >
              <Publish className={classes.icon} />
            </CustomButton>
          ) : file.status === processStatus.ERROR ? (
            <CustomButton
              content="Upload Failed"
              style={{ border: 'unset', cursor: 'unset', backgroundColor: 'unset', color: '#d10000', minWidth: '140px' }}
              type=""
              variant="contained"
            />
          ) : file.status === processStatus.SUCCESS ? (
            <CustomButton
              content="File Uploaded"
              style={{ border: 'unset', cursor: 'unset', backgroundColor: 'unset', color: '#2b8432', minWidth: '140px' }}
              type=""
              variant="contained"
            />
          ) : (
            ''
          )
        }

        {file.status !== processStatus.SUCCESS &&
          file.status !== processStatus.ERROR && (
          <CustomButton
            content="Remove"
            disabled={file.loading === true}
            onClick={() => handleDeleteFile(file.id, file.fileName)}
            type="red"
            variant="contained"
          >
            <Delete className={classes.icon} />
          </CustomButton>
        )}
      </div>

      <DialogDelete
        handleClose={handleCloseDialogDelete}
        handleConfirm={handleSubmitDialogDelete}
        message={dialogDeleteValue.message}
        open={dialogDeleteValue.open}
        title={dialogDeleteValue.title}
      />

      <DialogConfirm
        handleClose={handleCloseDialogConfirm}
        handleConfirm={handleSubmitDialogConfirm}
        message={dialogConfirmValue.message}
        open={dialogConfirmValue.open}
      />
    </li>
  );
};

File.propTypes = {
  file: PropTypes.object,
  handleOpenDetailError: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  handleUploadFile: PropTypes.func,
  handleValidateFile: PropTypes.func,
  loading: PropTypes.bool,
  no: PropTypes.number,
};

export default File;

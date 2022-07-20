import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper, Tooltip, Button } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, ContactSupport, Publish, ReportProblem } from '@material-ui/icons';
import { validateFile, importFile } from './ImportPanel.asyncActions';
import { clearState } from './ImportPanel.slice';
import { CustomButton, DialogConfirm, FileInput } from 'components';
import { TimeLine, File, DetailError } from './components';
import typeFile from 'utils/typeFile';
import processStatus from 'utils/processStatus';
import apiStatus from 'utils/apiStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:'14px',
    position:'relative',
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },

  title: {},

  divider: {
    backgroundColor: '#3f51b5',
    border: 'none',
    height: '2px'
  },

  tableData: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  processAction: {
    width: '100%',
    position: 'relative',
    marginBottom: '0px',
  },

  btnInput:{
    height: '40px',
    float: 'left',
    padding: theme.spacing(1),
    borderRadius: '4px',
    filter: 'none !important',
    curser: 'pointer',
    '&:hover': {
      backgroundColor: '#1a237e',
    }
  },

  tableFile: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '0px',
    flex: '1',
  },

  headerTable: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#c1c1c1',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },

  headerTableItem:{
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    margin: 'auto'
  },

  list:{
    height: '0px',
    overflow: 'auto',
    margin: '0px',
    flex: '100%',
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

  nullItem: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapperTimeLineAndTitle: {
    display: 'flex',
  },

  icon: {
    fontSize: '20px',
    paddingRight: '3px'
  },

  wrapperButton:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },

  fab: {
    margin: theme.spacing(2)
  },

  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },

  fileInput:{
    color:'green'
  },

  paper:{
    padding:'6px',
    display:'flex',
    flexDirection:'column',
    height:'100%',
  }
}));

const TutorialTooltip = withStyles((theme) => ({
  tooltip: {
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    color: '#263238',
    maxWidth: '700px',
    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.12), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.2)'
  },
}))(Tooltip);

const ImportPanel = () => {
  //#region logic handle

  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const status = useSelector(state => state.import.panel.status);
  const error = useSelector(state => state.import.panel.error);
  const message = useSelector(state => state.import.panel.message);

  //* show notification
  const showSnackbar = (message, status) => enqueueSnackbar(message, { variant: status });

  //* defaultProcess control show or hide button in process
  const defaultProcess = {
    canImport: true,
    canContactSupport: true,
    canBack: false,
    canCheck: false,
    canNext: false,
    canUpload: false,
  };
  const [process, setProcess] = useState(defaultProcess);

  //* defaultTimeLine control show step in process
  const defaultTimeLine = {
    pointerActive0: true,
    pointerActive1: false,
    pointerActive2: false,
  };
  const [timeLine, setTimeLine] = useState(defaultTimeLine);

  //* defaultDetailError control show DetailError when agents click button 'Detail Error'
  const defaultDetailError = {
    open: false,
    fileName: '',
    errors: []
  };
  const [detailError, setDetailError] = useState(defaultDetailError);
  const handleOpenDetailError = (fileName, errors) => setDetailError({ ...detailError, open: true, fileName: fileName, errors: errors });
  const handleCloseDetailError = () => setDetailError(defaultDetailError);

  const [changeData, setChangeData] = useState(true);
  const data = useRef([]);
  const requests = useRef([]);

  //* Dialog Confirm
  const defaultDialogConfirmValue = { open: false, message: '' };
  const [dialogConfirmValue, setDialogConfirmValue] = useState(defaultDialogConfirmValue);
  const handleOpenDialogConfirm = (message) => setDialogConfirmValue({ open: true, message: message });
  const handleCloseDialogConfirm = () => setDialogConfirmValue(defaultDialogConfirmValue);
  const handleSubmitDialogConfirm = () => {
    handleUploadAllFile();
    setDialogConfirmValue({ ...dialogConfirmValue, open: false });
  };

  //* ----- START HANDLE ACTION
  //* choose files anh setup data
  const handleChooseFile = (fileData) => {
    //* setup data
    const newData = fileData.map((item, index) => {
      let type = '';

      if (item.name.indexOf('Email') !== -1) type = typeFile.EMAIL;
      if (item.name.indexOf('Epic') !== -1) type = typeFile.EPIC;
      if (item.name.indexOf('Glip') !== -1) type = typeFile.GLIP;
      if (item.name.indexOf('IC') !== -1) type = typeFile.IC;
      if (item.name.indexOf('Punch') !== -1) type = typeFile.PUNCH;
      if (item.name.indexOf('RC') !== -1) type = typeFile.PHONE; // Phone data

      return {
        id: index,
        fileName: item.name,
        size: item.size,
        status: processStatus.NEED_VALIDATE,
        data: item,
        dataError: [],
        type: type,
        loading: false,
      };
    });

    data.current = [...newData];
    setChangeData(!changeData);

    if (newData.length > 0) {
      //* setup process action
      setProcess({
        ...process,
        canImport: false,
        canContactSupport: false,
        canCheck: true,
        canBack: true,
      });

      //* setup timeline
      setTimeLine({
        ...timeLine,
        pointerActive1: true
      });
    }
  };

  //* remove a file and resetup state data
  const handleRemoveFile = (fileId) => {
    const index = data.current.map((item) => item.id).indexOf(fileId);
    data.current.splice(index, 1);
    setChangeData(!changeData);

    if (data.current.length === 0) handleBackToChooseFile(); //* if data empty => back to the choose file interface
  };

  //* back to choose file interface
  const handleBackToChooseFile = () => {
    data.current = [];
    setChangeData(!changeData);
    setTimeLine(defaultTimeLine);
    setProcess(defaultProcess);
  };

  //* change the file list's loading state to true
  const handleLoading = async (indexs) => { //* indexs is a list index need loading
    if (data.current.length <= 0) return; //* no data -> no loading

    const newDataLoading = data.current.map((item, index) => {
      if (indexs.indexOf(index) !== -1) return {...item, loading: true};
      return {...item};
    });

    data.current = [...newDataLoading];
    setChangeData(!changeData);
  };

  //* call api validate file
  const validateFileDispatch = async (index, type) => {
    const requestDispatch = dispatch(validateFile({
      file: data.current[index].data,
      type: type
    }));

    requests.current.push(requestDispatch); //* push request to request for clear request when unmount

    const validateFileResult = await requestDispatch;

    if (data.current.length <= 0) return;  //* no data -> stop dispatch

    data.current[index].loading = false;
    if (!validateFileResult.error) {
      if (validateFileResult.payload.length === 0) {
        data.current[index].status = processStatus.VALID; //* if not record <=> not error, not warning -> change status file to valid

      } else if (validateFileResult.payload.some(item => item.status === 'error')) {
        data.current[index].status = processStatus.INVALID; //* if have record error -> change status file to invalid
        showSnackbar(`Detect errors in '${data.current[index].fileName}' file`, 'error');

      } else {
        data.current[index].status = processStatus.WARNINGVALID; //* if have record but not record error -> change status file to warningvalid
        showSnackbar(`Detect warning in '${data.current[index].fileName}' file`, 'warning');
      }

      if (data.current[index].status !== processStatus.VALID) data.current[index].dataError = validateFileResult.payload; //* if file status not a valid -> set file.dataError

    } else data.current[index].status = processStatus.NEED_VALIDATE;

    setChangeData(index); //* can't parameter !changeData because it not working
  };

  //* handle validate a file when click button 'Check'
  const handleValidateFile = async (fileId, type)  => {
    const indexs = [data.current.map((item) => item.id).indexOf(fileId)]; //* get index file need validate
    await handleLoading(indexs); //* set file state loading to true <=> validating... => change button 'Check' to loading icon

    await validateFileDispatch(indexs[0], type);
  };

  //* handle validate all file when click button 'Check All'
  const handleValidateAllFile = async () => {
    const indexs = data.current.map(item => {
      if (item.status === processStatus.NEED_VALIDATE) return data.current.map((file) => file.id).indexOf(item.id);
      else return undefined;
    }).filter(item => item !== undefined); //* get indexs file need validate

    await handleLoading(indexs); //* set file state loading to true <=> validating... => change button 'Check' to loading icon

    for (let i=0; i<data.current.length; i++) {
      if (data.current[i].status === processStatus.NEED_VALIDATE) await validateFileDispatch(i, data.current[i].type); //* only validate files need validate
    }
  };

  //* navigation to the upload interface
  const handleNext = () => {
    setTimeLine({
      ...timeLine,
      pointerActive2: true
    });

    setProcess({
      ...process,
      canNext: false,
      canUpload: true,
    });

    const newData = data.current.map((item) => {
      let newItem = { ...item };
      newItem.status = processStatus.NEED_UPLOAD;
      return { ...newItem };
    });
    data.current = [...newData];
    setChangeData(!changeData);
  };

  //* call api upload file
  const uploadFileDispatch = async (index, type) => {
    const requestDispatch = dispatch(importFile({
      file: data.current[index].data,
      type: type,
      fileName: data.current[index].fileName
    }));

    requests.current.push(requestDispatch); //* push request to request for clear request when unmount

    const importFileResult = await requestDispatch;

    if (data.current.length <= 0) return; //* no data -> stop dispatch

    data.current[index].loading = false;
    if (!importFileResult.error) {
      if (!importFileResult.payload) data.current[index].status = processStatus.SUCCESS; //* if upload file success -> change file status to success
      else data.current[index].status = processStatus.ERROR; //* if upload file error -> change file status to error

    } else data.current[index].status = processStatus.NEED_UPLOAD; //* if system error -> change file status to need upload

    setChangeData(index); //* can't parameter !changeData because it not working
  };

  //* handle upload a file when click button 'Upload'
  const handleUploadFile = async (fileId, type)  => {
    const indexs = [data.current.map((item) => item.id).indexOf(fileId)]; //* get index file need upload
    await handleLoading(indexs); //* set file state loading to true <=> uploading... => change button 'Upload' to loading icon

    await uploadFileDispatch(indexs[0], type);
  };

  //* handle upload all file when click button 'Upload All'
  const handleUploadAllFile = async () => {
    const indexs = data.current.map(item => {
      if (item.status === processStatus.NEED_UPLOAD) return data.current.map((file) => file.id).indexOf(item.id);
      else return undefined;
    }).filter(item => item !== undefined); //* get indexs file need upload

    await handleLoading(indexs); //* //* set file state loading to true <=> uploading... => change button 'Upload' to loading icon

    for (let i=0; i<data.current.length; i++) {
      if (data.current[i].status === processStatus.NEED_UPLOAD) await uploadFileDispatch(i, data.current[i].type); //* only upload files need upload
    }
  };

  const handleConfirmUpload = () => handleOpenDialogConfirm('Do you really want to upload all file');
  //* ----- END HANDLE ACTION

  //* ----- START USEEFFECT
  useEffect(() => {
    //* uncheckedFiles chua cac file chua duoc validate
    const uncheckedFiles = data.current.filter((item) => {
      if (item.status === processStatus.NEED_VALIDATE && item.loading === false) return item;
      else return null;
    });

    //* filesWithErrors chua cac file khong hop le
    const filesWithErrors = data.current.filter((item) => {
      if (item.status !== processStatus.VALID && item.status !== processStatus.WARNINGVALID) return item;
      else return null;
    });

    //* filesNotUploaded chua cac file chua duoc upload
    const filesNotUploaded = data.current.filter((item) => {
      if (item.status === processStatus.NEED_UPLOAD && item.loading === false) return item;
      else return null;
    });

    let newProcess = { ...process };

    if (uncheckedFiles.length === 0 || data.current.some(item => item.loading === true)) newProcess.canCheck = false; //* neu toan bo file da duoc validate => disabled button 'Check All'
    else newProcess.canCheck = true;

    if (data.current.length > 0 && uncheckedFiles.length === 0 && filesWithErrors.length === 0) newProcess.canNext = true; //* neu toan bo file da duoc validate va deu hop le => show button 'Next'
    else newProcess.canNext = false;

    if (filesNotUploaded.length === 0 || data.current.some(item => item.loading === true)) newProcess.canUpload = false; //* neu toan bo file da duoc upload => disabled button 'Upload All'
    else newProcess.canUpload = true;

    setProcess({ ...newProcess });

    if (data.current.length <= 0) {
      for (let i=0; i<requests.current.length; i++) {
        requests.current[i].abort(); //* clear requests
      }
    }

    // eslint-disable-next-line
  }, [changeData])

  useEffect(() => {
    if (status === apiStatus.SUCCESS) showSnackbar(message, status);
    if (status === apiStatus.ERROR) showSnackbar(error, status);
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    return () => {
      data.current = []; //* clear current data
      for (let i=0; i<requests.current.length; i++) {
        // eslint-disable-next-line
        requests.current[i].abort(); //* clear requests
      }
      dispatch(clearState()); //* clear state
    };
    // eslint-disable-next-line
  }, []);
  //#endregion

  //* UI
  return (
    <div className={classes.root}>
      <TimeLine timeLine={timeLine}  />

      <div className={classes.processAction}>
        { process.canImport &&
            <FileInput
              accept=".xlsx, .xls, .csv"
              className={classes.btnInput}
              handleChooseFile={handleChooseFile}
            /> }
        { process.canContactSupport &&
              <TutorialTooltip
                placement="right-start"
                title={
                  <React.Fragment>
                    <b style={{ fontSize: '16px', paddingBottom: '10px '}}>Notes</b>
                    <p style={{ fontSize: '13px', paddingLeft: '20px', paddingBottom: '10px' }}>If the upper button is unclickable, press F5.</p>

                    <b style={{ fontSize: '16px', paddingBottom: '10px '}}>&lt;Naming convention&gt;</b>
                    <p style={{ fontSize: '13px', paddingLeft: '20px', }}>We accept files with the same name as the following:</p>
                    <b style={{ fontSize: '13px', paddingLeft: '20px', }}>&lt;name&gt;-MM.dd.yyyy</b>
                    <p style={{ fontSize: '13px', paddingLeft: '20px', }}>The file name have to contain type of report</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '20px', }}>Ex:</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>Email-01.01.2020</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>Epic-01.01.2020</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>Glip-01.01.2020</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>IC-01.01.2020</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>Punch-01.01.2020</p>
                    <p style={{ fontSize:  '13px', paddingLeft:  '40px', }}>RC Data-01.01.2020</p>
                  </React.Fragment>
                }
              >
                <Button
                  style={{ height: '40px', padding: '0px', color: '#3f51b5' }}
                >
                  <ContactSupport style={{ width: '34px', height: '34px' }} />
                </Button>
              </TutorialTooltip>
        }
        { process.canBack &&
              <CustomButton
                content="Back to Choose File"
                onClick={handleBackToChooseFile}
                style={{ position: 'relative', float: 'left', margin: '0px 0px' }}
                type="blue-full"
                variant="contained"
              >
                <ArrowBackIos className={classes.icon} />
              </CustomButton> }
        { process.canCheck &&
              <CustomButton
                content="Check all"
                onClick={handleValidateAllFile}
                style={{ position: 'relative', float: 'right', margin: '0px 0px' }}
                type="orange"
                variant="contained"
              >
                <ReportProblem className={classes.icon} />
              </CustomButton> }
        { process.canNext &&
              <CustomButton
                content="Next"
                onClick={handleNext}
                style={{ position: 'relative', float: 'right', margin: '0px 0px' }}
                type="blue"
                variant="contained"
              >
                <ArrowForwardIos className={classes.icon} />
              </CustomButton> }
        { process.canUpload &&
              <CustomButton
                content="Upload all"
                onClick={handleConfirmUpload}
                style={{ position: 'relative', float: 'right', margin: '0px 0px' }}
                type="green"
                variant="contained"
              >
                <Publish className={classes.icon} />
              </CustomButton> }
      </div>

      <Paper
        className={classes.tableData}
        elevation={3}
        variant="outlined"
      >
        <div className={classes.tableFile}>
          <div className={classes.headerTable}>
            <div
              className={classes.headerTableItem}
              style={{flex:'1'}}
            >No</div>
            <div
              className={classes.headerTableItem}
              style={{flex:'3'}}
            >File Name</div>
            <div
              className={classes.headerTableItem}
              style={{flex:'1'}}
            >Size</div>
            <div style={{flex:'3', textAlign: 'center' }} >Action</div>
          </div>
          <ul className={classes.list}>
            {
              data.current.length > 0 ?
                data.current.map((file, index) => (
                  <File
                    file={file}
                    handleOpenDetailError={handleOpenDetailError}
                    handleRemoveFile={handleRemoveFile}
                    handleUploadFile={handleUploadFile}
                    handleValidateFile={handleValidateFile}
                    key={index}
                    loading={data.current.some(item => item.loading === true)} //* If there exists a file in loading state -> disabled all button 'Check', 'Upload'
                    no={index+1}
                  />
                )) :
                <div className={classes.nullItem}>No files have been selected</div>
            }
          </ul>
        </div>
      </Paper>

      <DetailError
        detailError={detailError}
        handleCloseDetailError={handleCloseDetailError}
      />

      <DialogConfirm
        handleClose={handleCloseDialogConfirm}
        handleConfirm={handleSubmitDialogConfirm}
        message={dialogConfirmValue.message}
        open={dialogConfirmValue.open}
      />
    </div>
  );
};

ImportPanel.propTypes = {};

export default ImportPanel;

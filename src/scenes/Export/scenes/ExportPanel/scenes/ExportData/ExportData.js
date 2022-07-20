import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Page } from 'components';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import Switch from '@material-ui/core/Switch';
// import * as qs from 'query-string';
import { DialogConfirm } from 'components';
import CustomButton from 'components/CustomButton';
import { useSnackbar } from 'notistack';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  addSelectedAgentExportData,
  removeSelectedAgentExportData,
  clearSelectedAgentExportData,
  clearStateExportData,
  setSelectedAgentExportData
} from './ExportData.slice';
import permissionAuth from 'utils/permissionAuth';
import CustomMultiSelect from 'components/MultiSelect';
import {
  getExportData,
  getAgentByDepartmentType
} from './ExportData.asyncActions';
import apiStatus from 'utils/apiStatus';

const useStyles = makeStyles(theme => ({
  root: {
    width: '96%',
    height: '100%',
    maxWidth: '100%',
    margin: '0 auto'
  },
  actionForm: {
    marginTop: theme.spacing(4),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    minHeight: '100%',
    width: '100%',
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4)
  },
  contentForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formControl: {
    width: '100%',
    margin: '0px',
    minWidth: '150px',
    maxWidth: '180px',
    paddingRight: theme.spacing(2),
    '& .MuiOutlinedInput-adornedEnd': {
      height: '38px'
    }
  },
  reportForm: {
    padding: theme.spacing(4),
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    marginTop: theme.spacing(4),
    textAlign: 'center'
  },
  switches: {
    marginTop: theme.spacing(2)
  },
  selectEmpty: {
    height: '38px',
    width: '100%',
    margin: '0px',
    minWidth: '150px',
    maxWidth: '180px',
    paddingRight: theme.spacing(2),
    '& .MuiOutlinedInput-adornedEnd': {
      height: '40px'
    }
  },
  selectAgentEmpty: {
    width: '100%',
    margin: '0px',
    minWidth: '150px',
    maxWidth: '180px',
    paddingRight: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 165,
      fontSize: 13,
      marginTop: -5
    }
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  getContentAnchorEl: null
};
const ExportData = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line
  const {
    canGetAgentReport,
    canGetDailyReport,
    canGetTeamChatReport,
    canGetWeeklyReport,
    userPermissions
  } = props;

  const selectedAgents = useSelector(
    state => state.export.panel.exportData.selectedAgents
  );
  const status = useSelector(state => state.export.panel.exportData.status);
  const error = useSelector(state => state.export.panel.exportData.error);
  const message = useSelector(state => state.export.panel.exportData.message);

  const [reportType, setReportType] = useState('');
  const [listAgent, setListAgent] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState('hlt');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedAgentsData, setSelectedAgentsData] = useState([]);
  const [isCheckAll, setCheckAll] = useState(true);

  //*Handle change type Report
  const handleChangeReportType = event => {
    setReportType(event.target.value);
  };

  //* show notification
  const showSnackbar = (message, status) =>
    enqueueSnackbar(message, { variant: status });

  //*Handle MultiSelect Agents
  const addSelectedAgent = item => {
    dispatch(addSelectedAgentExportData(item));
  };

  const removeSelectedAgent = item => {
    setCheckAll(false);
    dispatch(removeSelectedAgentExportData(item));
  };

  //*Handle Reset Filter
  const handleResetFilter = () => {
    dispatch(clearSelectedAgentExportData());
    // dispatch(setSelectedAgentExportData(entireAgent));
    setDepartment('none');
    setReportType('daily');
    setFromDate(new Date());
    setToDate(new Date());
  };

  //*Handle change Department
  const handleChangeDepartment = event => {
    setCheckAll(true);
    setDepartment(event.target.value);
  };

  const [dialogConfirm, setDialogConfirm] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [onDate, setOnDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleChangeFromDate = date => {
    setFromDate(date);
  };

  const handleChangeToDate = date => {
    setToDate(date);
  };

  const handleChangeOnDate = date => {
    setOnDate(date);
  };

  //*Handle Dialog Comfirm
  const handleCloseDialog = () => setDialogConfirm(false);
  const handleConfirmDialog = async () => {
    setDialogConfirm(false);
    if(reportType !== 'monday' ){
      // let actionResult = await dispatch(
      await dispatch(
        getExportData({
          agents: selectedAgentsData,
          department: department,
          fromDate: moment(
            fromDate,
            'dddMMMDDYYYYHHmmss GMTZZ'
          ).format('MM-DD-YYYY'),
          toDate: moment(toDate, 'dddMMMDDYYYYHHmmss GMTZZ').format('MM-DD-YYYY'),
          onDate: moment(onDate, 'dddMMMDDYYYYHHmmss GMTZZ').format('MM-DD-YYYY'),
          typeReport: reportType
        })
      );
      // const url = unwrapResult(actionResult);
      // console.log(url);
      // window.location.href = `${
      //   // eslint-disable-next-line no-undef
      //   process.env.REACT_APP_BASE_URL
      // }/export?${qs.stringify({url: url})}`;
    } else{
      const to = moment(toDate, 'dddMMMDDYYYYHHmmss GMTZZ').format('MM-DD-YYYY');
      const from = moment(fromDate, 'dddMMMDDYYYYHHmmss GMTZZ').format('MM-DD-YYYY');
      // eslint-disable-next-line no-undef
      window.location.href = `${process.env.REACT_APP_BASE_URL}/monday/download?from=${from}&&to=${to}&&id=${department}`;
    }
  };

  //*switches
  const [state, setState] = React.useState({
    daily: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //*Handle get Report
  const handleGetReport = () => {
    setDialogConfirm(true);
  };

  //*Handle check all
  const handleCheckAll = value => {
    if (!value) dispatch(clearSelectedAgentExportData());
    else {
      dispatch(setSelectedAgentExportData(listAgent));
    }

    setCheckAll(value);
  };

  //*Use Effect---------------------------------------------------------------------
  useEffect(() => {
    if(reportType === 'monday'){
      setListDepartment([
        {
          label: 'IC HLT',
          type: '1483255419'
        }
      ]);
      setDepartment('1483255419');
    }else{
      setListDepartment([
        {
          label: 'Commercial',
          type: 'commercial'
        },
        {
          label: 'Personal',
          type: 'personal'
        },
        {
          label: 'Health Life/Tax',
          type: 'hlt'
        }
      ]);
    }
  }, [reportType]);

  useEffect(() => {
    if (status === apiStatus.ERROR) {
      setOpenBackdrop(false);
      showSnackbar(error, status);
    }
    if (status === apiStatus.PENDING) {
      setOpenBackdrop(true);
    } else {
      if (status === apiStatus.SUCCESS && (message !== 'get departments success'|| message !== 'get agents success')) {
        setTimeout(() => {
          setOpenBackdrop(false);
        }, 500);
      }
    }
    // eslint-disable-next-line
  }, [status, error]);

  useEffect(() => {
    switch (true) {
      case userPermissions.indexOf(permissionAuth.GET_DAILY_REPORT) !== -1:
        setReportType('daily');
        break;
      case userPermissions.indexOf(permissionAuth.GET_WEEKLY_REPORT) !== -1:
        setReportType('weekly');
        break;
      case userPermissions.indexOf(permissionAuth.GET_AGENT_REPORT) !== -1:
        setReportType('agent');
        break;
      case userPermissions.indexOf(permissionAuth.GET_TEAM_CHAT_REPORT) !== -1:
        setReportType('teamChat');
        break;
      default:
    }
    // eslint-disable-next-line
  }, [userPermissions]);

  useEffect(() => {
    if (selectedAgents.length === 0) {
      setSelectedAgentsData(listAgent);
    } else {
      setSelectedAgentsData(selectedAgents);
    }
    // eslint-disable-next-line
  }, [selectedAgents]);

  useEffect(() => {
    const getAgent = async () => {
      const agentsData = [];
      const agents = await dispatch(getAgentByDepartmentType(department));
      const dataResponse = unwrapResult(agents);
      if (dataResponse.length > 0) {
        dataResponse.forEach(item => {
          agentsData.push({
            value: item.id,
            label: `${item.firstName} ${item.lastName}`
          });
        });
      }
      setListAgent(agentsData);
      dispatch(setSelectedAgentExportData(agentsData));
    };
    getAgent();
    setListDepartment([
      {
        label: 'Commercial',
        type: 'commercial'
      },
      {
        label: 'Personal',
        type: 'personal'
      },
      {
        label: 'Health Life/Tax',
        type: 'hlt'
      }
    ]);
    return () => dispatch(clearStateExportData());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getAgent = async () => {
      const agentsData = [];
      const agents = await dispatch(getAgentByDepartmentType(department));
      const dataResponse = unwrapResult(agents);
      if (dataResponse.length > 0) {
        dataResponse.forEach(item => {
          agentsData.push({
            value: item.id,
            label: `${item.firstName} ${item.lastName}`
          });
        });
      }
      setListAgent(agentsData);
      dispatch(setSelectedAgentExportData(agentsData));
    };
    getAgent();

    // eslint-disable-next-line
  }, [department]);

  //* UI-----------------------------------------------------------------------
  return (
    <Page
      className={classes.root}
      title="Export"
    >
      <Paper
        className={classes.container}
        elevation={1}
      >
        <Grid className={classes.contentForm}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
          >
            <InputLabel id="demo-simple-select-placeholder-label-label">
              Select Report Type
            </InputLabel>
            <Select
              MenuProps={MenuProps}
              className={classes.selectEmpty}
              defaultValue=""
              displayEmpty
              label="Select Report Type"
              onChange={handleChangeReportType}
              value={reportType}
            >
              {canGetDailyReport && (
                <MenuItem
                  key="daily"
                  value="daily"
                >
                  Daily Report
                </MenuItem>
              )}
              {canGetWeeklyReport && (
                <MenuItem
                  key="weekly"
                  value="weekly"
                >
                  Weekly Report
                </MenuItem>
              )}
              {canGetAgentReport && (
                <MenuItem
                  key="agent"
                  value="agent"
                >
                  Agent Report
                </MenuItem>
              )}
              {canGetTeamChatReport && (
                <MenuItem
                  key="teamChat"
                  value="teamChat"
                >
                  Team Chat Report
                </MenuItem>
              )}
              <MenuItem
                key="monday"
                value="monday"
              >
                  Monday
              </MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <>
              {reportType === 'daily' && (
                <>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                      Select Department *
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      className={classes.selectEmpty}
                      defaultValue="hlt"
                      displayEmpty
                      label="Select Department"
                      onChange={handleChangeDepartment}
                      value={department}
                    >
                      {listDepartment &&
                        listDepartment.map(item => (
                          <MenuItem
                            key={item.type}
                            value={item.type}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <CustomMultiSelect
                    addSelectedAgent={addSelectedAgent}
                    checkAll={handleCheckAll}
                    className={classes.selectAgentEmpty}
                    isCheckAll={isCheckAll}
                    label="Agents"
                    options={listAgent}
                    removeSelectedAgent={removeSelectedAgent}
                    selectedItems={selectedAgents}
                  />
                  <KeyboardDatePicker
                    className={classes.formControl}
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    label={'Date Report'}
                    margin="normal"
                    maxDate={new Date()}
                    onChange={handleChangeOnDate}
                    value={onDate}
                    variant="inline"
                  />
                </>
              )}
              {(reportType === 'weekly' || reportType === 'agent') && (
                <>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                      Select Department *
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      className={classes.selectEmpty}
                      defaultValue="hlt"
                      displayEmpty
                      label="Select Department"
                      onChange={handleChangeDepartment}
                      value={department}
                    >
                      {listDepartment &&
                        listDepartment.map(item => (
                          <MenuItem
                            key={item.type}
                            value={item.type}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <CustomMultiSelect
                    addSelectedAgent={addSelectedAgent}
                    checkAll={handleCheckAll}
                    className={classes.selectAgentEmpty}
                    isCheckAll={isCheckAll}
                    label="Agents"
                    options={listAgent}
                    removeSelectedAgent={removeSelectedAgent}
                    selectedItems={selectedAgents}
                  />
                  <KeyboardDatePicker
                    className={classes.formControl}
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    label={'From Date'}
                    margin="normal"
                    maxDate={new Date()}
                    onChange={handleChangeFromDate}
                    value={fromDate}
                    variant="inline"
                  />
                  <KeyboardDatePicker
                    className={classes.formControl}
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    label="To Date"
                    margin="normal"
                    maxDate={new Date()}
                    minDate={fromDate}
                    onChange={handleChangeToDate}
                    value={toDate}
                    variant="inline"
                  />
                </>
              )}
              {reportType === 'teamChat' && (
                <>
                  {state.daily === false && (
                    <>
                      <KeyboardDatePicker
                        className={classes.formControl}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        label={'Date Report'}
                        margin="normal"
                        maxDate={new Date()}
                        onChange={handleChangeFromDate}
                        value={fromDate}
                        variant="inline"
                      />
                    </>
                  )}
                  {state.daily === true && (
                    <>
                      <KeyboardDatePicker
                        className={classes.formControl}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        label={'From Date'}
                        margin="normal"
                        maxDate={new Date()}
                        onChange={handleChangeFromDate}
                        value={fromDate}
                        variant="inline"
                      />
                      <KeyboardDatePicker
                        className={classes.formControl}
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        label="To Date"
                        margin="normal"
                        maxDate={new Date()}
                        minDate={fromDate}
                        onChange={handleChangeToDate}
                        value={toDate}
                        variant="inline"
                      />
                    </>
                  )}
                  <FormControlLabel
                    className={classes.switches}
                    control={
                      <Switch
                        checked={state.daily}
                        color="primary"
                        name="daily"
                        onChange={handleChange}
                      />
                    }
                    label="Range Date"
                  />
                </>
              )}
              {reportType === 'monday' && (
                <>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                      Select Department *
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      className={classes.selectEmpty}
                      defaultValue="1483255419"
                      displayEmpty
                      label="Select Department"
                      onChange={handleChangeDepartment}
                      value={department}
                    >
                      {listDepartment &&
                        listDepartment.map(item => (
                          <MenuItem
                            key={item.type}
                            value={item.type}
                          >
                            {item.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <KeyboardDatePicker
                    className={classes.formControl}
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    label={'From Date'}
                    margin="normal"
                    maxDate={new Date()}
                    onChange={handleChangeFromDate}
                    value={fromDate}
                    variant="inline"
                  />
                  <KeyboardDatePicker
                    className={classes.formControl}
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    label="To Date"
                    margin="normal"
                    maxDate={new Date()}
                    minDate={fromDate}
                    onChange={handleChangeToDate}
                    value={toDate}
                    variant="inline"
                  />
                </>
              )}
            </>
          </MuiPickersUtilsProvider>

          <CustomButton
            content="Reset filter"
            onClick={handleResetFilter}
            style={{ position: 'relative', float: 'right', margin: '0px 10px' }}
            type="orange"
            variant="contained"
          />
        </Grid>
        <Grid className={classes.actionForm}>
          <CustomButton
            content="Get report"
            onClick={handleGetReport}
            style={{ position: 'relative', float: 'right', margin: '0px 0px' }}
            type="blue"
            variant="contained"
          />
        </Grid>
        <DialogConfirm
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmDialog}
          message="Download Report"
          open={dialogConfirm}
        />
      </Paper>
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Page>
  );
};

ExportData.propTypes = {
  canGetAgentReport: PropTypes.bool,
  canGetDailyReport: PropTypes.bool,
  canGetTeamChatReport: PropTypes.bool,
  canGetWeeklyReport: PropTypes.bool,
  userPermissions: PropTypes.array
};

export default ExportData;

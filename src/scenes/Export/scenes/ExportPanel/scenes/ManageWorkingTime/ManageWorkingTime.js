import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Switch from '@material-ui/core/Switch';
import './ManageWorkingTime.style.scss';
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
} from '@material-ui/core';
import { AddDialog, EditDialog, ListManageWorkingTime } from './components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAgentsManageWorkingTime,
  getPunchOfAgent,
  getDepartments
} from './ManageWorkingTime.asyncActions';
import moment from 'moment';
import apiStatus from 'utils/apiStatus';
import { clearStateEditDialog,clearStateExport,ResetFilterAction,selectDepartment } from './ManageWorkingTime.slice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '96%',
    height: '100%',
    maxWidth: '100%',
    margin: '0 auto'
  },
  actionForm: {
    flex: '1',
    width: '100%',
    border: '1px solid #CFCDCD',
    borderRadius: '4px'
  },
  getReportBtn: {
    height: '40px',
    width: '103px',
    border: 'none',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main || 'red',
    outline: 'none',
    textAlign: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
  },
  resetFilterBtn: {
    textTransform: 'none',
    border: '2px solid #FF7F50',
    marginRight: theme.spacing(2),
    outline: 'none',
    textAlign: 'center',
    color: '#FF7F50',
    height: '40px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#FFF8DC'
    }
  },
  formControl: {
    margin: '0px',
    paddingRight: theme.spacing(2),
    width: '100%',
    minWidth: '150px',
    maxWidth: '180px',
    '& .MuiOutlinedInput-adornedEnd': {
      height: '40px'
    }
  },
  formGetData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
    borderRadius: '4px',
    height: '90px',
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  switches: {
    marginTop: theme.spacing(2)
  },
  selectEmpty: {
    height: '40px'
  }
}));

const ManageWorkingTime = props => {
  const classes = useStyles();
  // eslint-disable-next-line
  const { canCreatePunch, canUpdatePunch, userPermissions } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const agents = useSelector(state => state.export.panel.manageWorkingTime.agents);
  const departments = useSelector(
    state => state.export.panel.manageWorkingTime.departments
  );
  const punchOfAgent = useSelector(
    state => state.export.panel.manageWorkingTime.PunchOfAgent
  );
  const status = useSelector(state => state.export.panel.manageWorkingTime.status);
  const message = useSelector(state => state.export.panel.manageWorkingTime.message);
  const error = useSelector(state => state.export.panel.manageWorkingTime.error);
  const editDialogStatus = useSelector(state => state.export.panel.manageWorkingTime.editDialogStatus);
  const addDialogStatus = useSelector(state => state.export.panel.manageWorkingTime.addDialogStatus);

  const [listItems, setListItems] = useState([]);

  const [agentId, setAgentId] = useState('Agent');

  const handleChangeSelectAgent = event => {
    setAgentId(event.target.value);
    setGetActive(false);
    setEditItem({
      ...editItem,
      open: false
    });
  };

  const handleChangeSelectDepartment = event => {
    dispatch(selectDepartment(event.target.value));
    setAgentId('Agent');
    setGetActive(true);
    setEditItem({
      ...editItem,
      open: false
    });
  };

  const [dateReportOrFromDate, setDateReportOrFromDate] = useState(new Date());
  const handleChangeDateReportOrFromDate = date => {
    setDateReportOrFromDate(date);
    setGetActive(false);
    setEditItem({
      ...editItem,
      open: false
    });
  };

  const [toDate, setToDate] = useState(new Date());
  const handleChangeToDate = date => {
    setToDate(date);
    setGetActive(false);
    setEditItem({
      ...editItem,
      open: false
    });
  };

  //* show notification
  const showSnackbar = (message, status) => enqueueSnackbar(message, { variant: status });

  //*Handle Get Data
  const handleGetData = () => {
    let dateToInput = '';
    let data;
    const dateFromInput = moment(
      dateReportOrFromDate,
      'dddMMMDDYYYYHHmmss GMTZZ'
    ).format('YYYY-MM-DD');
    if (!state.daily) {
      dateToInput = dateFromInput;
    } else {
      dateToInput = moment(toDate, 'dddMMMDDYYYYHHmmss GMTZZ').format(
        'YYYY-MM-DD'
      );
    }
    if (agentId.trim() !== 'Agent') {
      const agentIdInput = agentId;
      data = {
        from: dateFromInput,
        to: dateToInput,
        id: agentIdInput
      };
      dispatch(getPunchOfAgent(data));
    }
  };
  //*Handle add Dialog
  const [addItem, setAddItem] = useState({
    open: false,
    change: false
  });
  const handleOpenDialogAddItem = () => {
    setAddItem({
      open: true,
      change: !addItem.change
    });
  };

  //*Handle Edit Dialog
  const [editItem, setEditItem] = useState({
    open: false,
    change: false
  });
  const [itemEditDialog, setItemEditDialog] = useState();
  const handleOpenDialogEdit = punchItem => {
    setItemEditDialog(punchItem);
    setEditItem({
      open: true,
      change: !editItem.change
    });
  };
  const handleClearEditState = () => {
    dispatch(clearStateEditDialog());
  };

  //*Handle active button
  const [getActive, setGetActive] = useState(true);

  //*Handle Resetfilter
  const handleResetFilter = () => {
    setGetActive(false);
    setEditItem({
      ...editItem,
      open: false
    });
    dispatch(ResetFilterAction());
  };

  //*switches
  const [state, setState] = React.useState({
    daily: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if(agentId !== 'Agent'){
      setGetActive(false);
    }
    // setGetActive(false);
  };

  //*Get Agents
  useEffect(() => {
    const getAgentAndDepartment = async () => {
      await dispatch(getAgentsManageWorkingTime());
      await dispatch(getDepartments());
    };
    getAgentAndDepartment();
    return () => dispatch(clearStateExport());
    // eslint-disable-next-line
  }, []);

  //*set List Punch
  useEffect(() => {
    setListItems(punchOfAgent);
    // eslint-disable-next-line
  }, [punchOfAgent]);

  //*Handle with status
  useEffect(() => {
    if(status === apiStatus.SUCCESS && message === 'Get punch of agent success !!'){
      showSnackbar(message, status);
      setGetActive(true);
    }
    if(editDialogStatus === apiStatus.SUCCESS && message === 'Update punch of agent success !!'){
      showSnackbar(message, editDialogStatus);
    }
    if(addDialogStatus === apiStatus.SUCCESS && message === 'Add punch of agent success !!'){
      showSnackbar(message, addDialogStatus);
    }
    // eslint-disable-next-line
  },[status,error,editDialogStatus,addDialogStatus]);

  //* UI
  return (
    <div className={classes.root}>
      <Paper className={classes.formGetData}>
        {/* <Grid className={classes.contentForm}> */}
        <FormControl
          className={classes.formControl}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-placeholder-label-label">
            Select Department
          </InputLabel>
          <Select
            className={classes.selectEmpty}
            defaultValue="empty"
            displayEmpty
            label="Select Department"
            onChange={handleChangeSelectDepartment}
            // value="data"
          >
            <MenuItem
              key="Empty"
              value="empty"
            >
              All Agent
            </MenuItem>
            {departments.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          className={classes.formControl}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-placeholder-label-label">
            Agent
          </InputLabel>
          <Select
            className={classes.selectEmpty}
            defaultValue="Agent"
            displayEmpty
            label="Agent"
            onChange={handleChangeSelectAgent}
            value={agentId}
          >
            {agentId === 'Agent' ? <MenuItem
              key="Agent"
              value="Agent"
            >
              Select Agent
            </MenuItem> : null
            }
            {agents.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item.id}
                >
                  {item.firstName + ' ' + item.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <>
            {state.daily === false && (
              <KeyboardDatePicker
                className={classes.formControl}
                format="MM/dd/yyyy"
                inputVariant="outlined"
                label={'Date Report'}
                margin="normal"
                maxDate={new Date()}
                onChange={handleChangeDateReportOrFromDate}
                value={dateReportOrFromDate}
                variant="inline"
              />
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
                  onChange={handleChangeDateReportOrFromDate}
                  value={dateReportOrFromDate}
                  variant="inline"
                />
                <KeyboardDatePicker
                  className={classes.formControl}
                  format="MM/dd/yyyy"
                  inputVariant="outlined"
                  label="To Date"
                  margin="normal"
                  maxDate={new Date()}
                  minDate={dateReportOrFromDate}
                  onChange={handleChangeToDate}
                  value={toDate}
                  variant="inline"
                />
              </>
            )}
          </>
        </MuiPickersUtilsProvider>
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
        <CustomButton
          content="Reset filter"
          onClick={handleResetFilter}
          style={{ position: 'relative', float: 'right', margin: '0px 10px' }}
          type="orange"
          variant="contained"
        />
        <CustomButton
          content="Get Data"
          disabled = {getActive}
          onClick={handleGetData}
          style={{ position: 'relative', float: 'right', margin: '0px 10px' }}
          type="blue"
          variant="contained"
        />

        {/* <Button
          className={classes.getReportBtn}
          disabled = {getActive}
          onClick={handleGetData}
          variant="contained"
        >
          Get Data
        </Button> */}
        {/* </Grid> */}
      </Paper>
      <Grid className={classes.actionForm}>
        <ListManageWorkingTime
          canCreatePunch={canCreatePunch}
          canUpdatePunch={canUpdatePunch}
          listItems={listItems}
          openAddDialog={handleOpenDialogAddItem}
          openEditDialog={handleOpenDialogEdit}
        />
      </Grid>
      {canCreatePunch && (
        <AddDialog
          addDialogStatus={addDialogStatus}
          change={addItem.change}
          open={addItem.open}
          punch={listItems[0]}
        />
      )}

      {canUpdatePunch && listItems.length > 0 && (
        <EditDialog
          change={editItem.change}
          clearState={handleClearEditState}
          editDialogStatus={editDialogStatus}
          open={editItem.open}
          punch={itemEditDialog}
        />
      )}
    </div>
  );
};

ManageWorkingTime.propTypes = {
  canCreatePunch: PropTypes.bool,
  canUpdatePunch: PropTypes.bool,
  userPermissions: PropTypes.array
};

export default ManageWorkingTime;

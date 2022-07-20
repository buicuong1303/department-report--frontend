import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LOG_TYPE } from 'constants/global';
import moment from 'moment';
import { CustomButton } from 'components';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '10px 0px'
  },
  select: {
    minWidth: '150px'
  },
  formControl: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '5px'
    }
  },
  btnDataCenter: {
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    padding: '8px 0px',
    color: 'white',
    margin: '0px 5px',
    minWidth: '80px',
    fontWeight: '500',
    fontSize: '13px'
  },
  picker: {
    width: '200px',
    margin: '0px 5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '5px'
    }
  },
  hidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));
const ToolBar = props => {
  const classes = useStyles();
  const { onFilter, onReset, users } = props;
  const [logType, setLogType] = useState('');
  const [currentUser, setCurrentUer] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [onDate, setOnDate] = useState(null);

  const handleReset = () => {
    if (!onReset) return;
    setLogType('');
    setFromDate(null);
    setToDate(null);
    setOnDate(null);
    onReset();
  };

  const handleFilter = () => {
    if (!onFilter) return;
    onFilter({
      type: logType,
      from: fromDate,
      to: toDate,
      on: onDate,
      userId: currentUser,
    });
  };

  const handleChangeCurrentUser = event => {
    setCurrentUer(event.target.value);
  };
  const handleChangeLogType = event => {
    setLogType(event.target.value);
  };
  const [rangeDate, setRangeDate] = useState(true);
  const handleFromDateChange = date => {
    setFromDate(moment(date).format('YYYY-MM-DD'));
    setOnDate(null);
  };
  const handleToDateChange = date => {
    setToDate(moment(date).format('YYYY-MM-DD'));
    setOnDate(null);
  };
  const handleOnDateChange = date => {
    setOnDate(moment(date).format('YYYY-MM-DD'));
    setFromDate(null);
    setToDate(null);
  };
  const handleChangeSwitch = event => {
    setRangeDate(event.target.checked);
  };
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label" margin={'dense'}>
          LogType
        </InputLabel>
        <Select
          MenuProps={MenuProps}
          className={classes.select}
          id="demo-simple-select-outlined"
          label="LogType"
          labelId="demo-simple-select-outlined-label"
          margin={'dense'}
          onChange={handleChangeLogType}
          value={logType}
          variant={'outlined'}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {LOG_TYPE.map(item => (
            <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label" margin={'dense'}>
          User
        </InputLabel>
        <Select
          MenuProps={MenuProps}
          className={classes.select}
          id="demo-simple-select-outlined"
          label="User"
          labelId="demo-simple-select-outlined-label"
          margin={'dense'}
          onChange={handleChangeCurrentUser}
          value={currentUser}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.length > 0 &&
            users.map(user => {
              return (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {rangeDate ? (
          <>
            <KeyboardDatePicker
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              className={classes.picker}
              disableToolbar
              format="MM/dd/yyyy"
              id="date-picker-inline"
              inputVariant={'outlined'}
              label="From"
              margin={'dense'}
              onChange={handleFromDateChange}
              value={fromDate}
              variant="inline"
            />
            <KeyboardDatePicker
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              className={classes.picker}
              disableToolbar
              format="MM/dd/yyyy"
              id="date-picker-inline"
              inputVariant={'outlined'}
              label="To"
              margin={'dense'}
              onChange={handleToDateChange}
              value={toDate}
              variant="inline"
            />
          </>
        ) : (
          <KeyboardDatePicker
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            className={classes.picker}
            disableToolbar
            format="MM/dd/yyyy"
            id="date-picker-inline"
            inputVariant={'outlined'}
            label="On"
            margin={'dense'}
            onChange={handleOnDateChange}
            value={onDate}
            variant="inline"
          />
        )}
      </MuiPickersUtilsProvider>
      <Switch
        checked={rangeDate}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        name="checkedB"
        onChange={handleChangeSwitch}
      />
      <span className={classes.hidden}>Range date</span>
      <CustomButton
        className={classes.btnDataCenter}
        content="Reset filter"
        onClick={handleReset}
        type="orange-full"
        variant="contained"
      />
        
      <CustomButton
        className={classes.btnDataCenter}
        color="primary"
        content="Get data"
        onClick={handleFilter}
        type="blue-full"
        variant="contained"
      />
        
    </div>
  );
};

export default ToolBar;

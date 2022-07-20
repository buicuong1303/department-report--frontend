/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
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
import clsx from 'clsx';
import CustomMultiSelect from '../../../../components/MultiSelect';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CustomButton } from 'components';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '5px',
    [theme.breakpoints.down('md')]: {
      margin: '5px',
      padding: '8px 0px',
      justifyContent: 'center'
    }
  },
  select: {
    minWidth: '150px'
  },
  formControl: {
    marginRight: '5px'
  },
  btnDataCenter: {
    backgroundColor: theme.palette.primary.main,
    padding: '8px 0px',
    color: 'white',
    margin: '5px',
    minWidth: '95px',
    fontWeight: '500',
    fontSize: '13px',
    textTransform: 'none',

    [theme.breakpoints.down('sm')]: {
      margin: '5px',
      padding: '8px 0px'
    }
  },
  picker: {
    width: '170px',
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
  },
  multiSelect: {
    minWidth: '150px',
    margin: '0px 5px'
  }
}));

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


const ToolBar = props => {
  const classes = useStyles();
  const departmentOptions = useSelector(state => state.dataCenter.mixin.departments);

  const { onGetFilterData, filterData, onChangeFilterData } = props;
  const [department, setDepartment] = React.useState('');
  const [rangeDate, setRangeDate] = React.useState(true);
  const [isCheckAll, setCheckAll] = React.useState(true);



  const handleChangeDepartment = event => {
    const department = event.target.value;

    setDepartment(department);
    setCheckAll(true);
    if(onChangeFilterData)
      onChangeFilterData({selectedAgents: department.agents});
  };

  const handleFromDateChange = date => {
    if (onChangeFilterData)
      onChangeFilterData({ from: moment(date).format('MM/DD/YYYY') });
  };

  const handleToDateChange = date => {
    if (onChangeFilterData)
      onChangeFilterData({ to: moment(date).format('MM/DD/YYYY') });
  };

  const handleOnDateChange = date => {
    if (onChangeFilterData)
      onChangeFilterData({ on: moment(date).format('MM/DD/YYYY') });
  };

  const handleChangeSwitch = event => {
    setRangeDate(event.target.checked);
    if (onChangeFilterData)
      onChangeFilterData({ to: null, from: null, on: null });
  };

  const handleResetFilter = () => {
    if(!onChangeFilterData) return;
    setDepartment('');
    onChangeFilterData({on: null, from: null, to: null, selectedAgents: null});
  };

  const handleGetData = () => {
    if(onGetFilterData){
      onGetFilterData();
    }
  };
  const handleCheckAll = value => {
    if(!onChangeFilterData) return;
    if (!value) onChangeFilterData({selectedAgents: []});
    else onChangeFilterData({selectedAgents: department.agents});
    setCheckAll(value);
  };

  const handleAddSelectedAgent = item => {
    if(!onChangeFilterData) return;
    const newSelectedAgent = [...filterData.selectedAgents, item];
    onChangeFilterData({selectedAgents: newSelectedAgent});
  };

  const handleRemoveSelectedAgent = item => {
    if(!onChangeFilterData) return;
    const newSelectedAgent = [...filterData.selectedAgents];
    const indexAgent = newSelectedAgent.findIndex(agent => agent.value === item.value);
    if(indexAgent > -1){
      newSelectedAgent.splice(indexAgent, 1);
      onChangeFilterData({selectedAgents: newSelectedAgent});
      setCheckAll(false);
    }
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel
          className={classes.label}
          id="demo-simple-select-outlined-label"
          margin={'dense'}
        >
          Department
        </InputLabel>
        <Select
          MenuProps={MenuProps}
          className={clsx(classes.select, classes.control)}
          id="demo-simple-select-outlined"
          label="Department"
          labelId="demo-simple-select-outlined-label"
          margin={'dense'}
          onChange={handleChangeDepartment}
          value={department}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departmentOptions &&
            departmentOptions.map(item => (
              <MenuItem key={item.value} value={item}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <CustomMultiSelect
        addSelectedAgent={handleAddSelectedAgent}
        checkAll={handleCheckAll}
        className={classes.multiSelect}
        isCheckAll={isCheckAll}
        label="Agents"
        options={department.agents}
        removeSelectedAgent={handleRemoveSelectedAgent}
        selectedItems={
          filterData.selectedAgents ? filterData.selectedAgents : []
        }
      />

      {rangeDate ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={clsx(classes.picker)}
            format="MM/dd/yyyy"
            id="date-picker-inline"
            inputVariant={'outlined'}
            label="From"
            margin={'dense'}
            maxDate={new Date()}
            onChange={handleFromDateChange}
            value={filterData.from}
            variant="inline"
          />
          <KeyboardDatePicker
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            className={clsx(classes.picker)}
            format="MM/dd/yyyy"
            id="date-picker-inline"
            inputVariant={'outlined'}
            label="To"
            margin={'dense'}
            maxDate={new Date()}
            minDate={filterData.from}
            onChange={handleToDateChange}
            value={filterData.to}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            className={clsx(classes.picker)}
            format="MM/dd/yyyy"
            id="date-picker-inline"
            inputVariant={'outlined'}
            label="Date"
            margin={'dense'}
            maxDate={new Date()}
            onChange={handleOnDateChange}
            value={filterData.on}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      )}

      <Switch
        checked={rangeDate}
        className={clsx(classes.control, classes.hidden)}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        name="rangeDate"
        onChange={handleChangeSwitch}
      />
      <span className={classes.hidden}>Range date</span>
      <CustomButton
        className={classes.btnDataCenter}
        content="Reset filter"
        onClick={handleResetFilter}
        type="orange-full"
        variant="contained"
      />
      <CustomButton
        className={classes.btnDataCenter}
        color="primary"
        content="Get data"
        onClick={handleGetData}
        type="blue-full"
        variant="contained"
      />
    </div>
  );
};
ToolBar.propsTypes = {
  onFilter: PropTypes.func
};

ToolBar.defaultProps = {
  filterData: {
    from:null,
    to: null,
    on: null,
  }
};

export default ToolBar;

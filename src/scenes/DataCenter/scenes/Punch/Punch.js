/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
// import { makeStyles } from '@material-ui/core'
import ToolBar from '../../components/ToolBar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { TablePagination, TextField } from '@material-ui/core';
import { AuthGuard, DialogDelete } from 'components';
import CustomizedDialogs from './components/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { isNumeric } from 'utils/validateNumber';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  deleteDataPunchAction,
  getDataPunchAction,
  updateDataPunchAction
} from './Punch.asyncActions';
import apiStatus from 'utils/apiStatus';
import { clearStatePunch } from './Punch.slice';
import permissionAuth from 'utils/permissionAuth';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: '0px 5px'
    }
  },
  wrapper: {
    position: 'relative'
  },
  inputPage: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    right: '400px',
    fontSize: '13px'
  }
}));

// eslint-disable-next-line react/no-multi-comp
const Punch = (props) => {
  // eslint-disable-next-line
  const { canUpdate, canDelete } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [infoDelete, setInfoDelete] = useState({
    id: '',
    title: '',
    message: '',
    open: false
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0
  });
  const [filterPage, setFiltersPage] = useState({
    page: 1,
    limit: 5
  });
  const [recordEditing, setRecordEditing] = useState(null);
  const [listData, setListData] = useState([]);

  const status = useSelector(state => state.dataCenter.punch.status);
  const message = useSelector(state => state.dataCenter.punch.message);
  const [pageInput, setPageInput] = useState(1);

  //* show notification
  const showSnackbar = (message, status) =>
    enqueueSnackbar(message, { variant: status });

  const parseDataRes = dataResponse => {
    const { data, pagination: paginationNew } = dataResponse;
    const newData = data.map(item => {
      return {
        ...item
        // agent: item.agent.firstName + ' ' + item.agent.lastName
      };
    });
    setListData(newData);
    setPagination(paginationNew);
  };
  const handlePageInputChange = e => {
    const value = e.target.value;
    const totalPage = Math.ceil(pagination.total / filterPage.limit);
    if (value !== '') {
      if (!isNumeric(value)) return;
      if (value > totalPage || value < 1) return;
    }

    setPageInput(value);
  };
  const handleBlur = e => {
    const value = e.target.value;
    setPageInput(value);
    handlePageChange(e, value);
  };
  const handlePageChange = (e, page) => {
    setFiltersPage({ ...filterPage, page: +page });
    setPageInput(+page);
  };

  const handleChangeRowsPerPage = value => {
    setFiltersPage({ ...filterPage, limit: value });
  };
  const handleFilter = async filters => {
    const actionResult = await dispatch();
    getDataPunchAction({ ...filterPage, ...filters });
    const dataResponse = unwrapResult(actionResult);
    parseDataRes(dataResponse);
  };

  const handleClose = state => {
    setOpenEdit(state);
  };
  const handleEdit = (event, data) => {
    setRecordEditing(listData.find(item => item.id === data.id));
    setOpenEdit(true);
  };
  const handleDelete = (event, data) => {
    setInfoDelete({
      id: data.id,
      title: 'Do you want to delete',
      message: '',
      open: true
    });
  };
  const handleConfirmDelete = async () => {
    const actionResult = await dispatch(deleteDataPunchAction(infoDelete.id));
    const { id } = unwrapResult(actionResult);
    if (id) {
      showSnackbar('delete success', 'success');
      setFiltersPage({ ...filterPage });
      setInfoDelete({ open: false, title: '', message: '' });
    }
  };
  const handleCloseConfirm = () => {
    setInfoDelete({ open: false, title: '', message: '' });
  };
  const handleSubmit = async values => {
    const actionResult = await dispatch();
    updateDataPunchAction({ id: recordEditing.id, data: values });

    let newData = unwrapResult(actionResult);
    if (newData.id) {
      showSnackbar('update success', 'success');
      newData = {
        ...newData,
        agent:
          newData.agent &&
          newData.agent.firstName + ' ' + newData.agent.lastName
      };
      const index = listData.findIndex(item => item.id === newData.id);
      if (index < 0) return;
      const newArray = [
        ...listData.slice(0, index),
        newData,
        ...listData.slice(index + 1)
      ];
      setListData(newArray);
      setOpenEdit(false);
    }
  };
  useEffect(() => {
    const fetchDataGlip = async () => {
      const actionResult = await dispatch(getDataPunchAction(filterPage));
      // eslint-disable-next-line no-unused-vars
      const dataResponse = unwrapResult(actionResult);
      // parseDataRes(dataResponse);
    };
    fetchDataGlip();
    // eslint-disable-next-line
  }, [filterPage]);
  useEffect(() => {
    return () => dispatch(clearStatePunch());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (status === apiStatus.ERROR) showSnackbar(message, status);
    // eslint-disable-next-line
  }, [status, message]);
  return (
    <AuthGuard requestPermissions={[permissionAuth.VIEW_ALL_PUNCH_DATA]}>
      <div className={classes.root}>
        <ToolBar onFilter={handleFilter} />
        <DialogDelete
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirmDelete}
          open={infoDelete.open}
          title={infoDelete.title}
        />
        <CustomizedDialogs
          onClose={handleClose}
          open={openEdit}
          onSubmit={handleSubmit}
          recordEditing={recordEditing}
        />
        <div className={classes.wrapper}>
          <MaterialTable
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: () => console.log('ok')
              }
            ]}
            columns={[
              {
                title: 'Date',
                field: 'date',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Department',
                field: 'department',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Name',
                field: 'name',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Check in',
                field: 'checkIn',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Start lunch',
                field: 'startLunch',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'End lunch',
                field: 'endLunch',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Lunch time',
                field: 'lunchTime',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Check out',
                field: 'checkOut',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Total lunch',
                field: 'totalLunch',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Total work',
                field: 'totalWork',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Total time',
                field: 'totalTime',
                headerStyle: { whiteSpace: 'nowrap' }
              }
            ]}
            components={{
              // eslint-disable-next-line react/display-name
              Action: props => (
                <>
                  {
                    canUpdate &&
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={event => handleEdit(event, props.data)}
                      size="small"
                      style={{ textTransform: 'none' }}
                      variant="contained"
                    >
                      <EditIcon />
                    </IconButton>
                  }
                  {
                    canDelete &&
                    <IconButton
                      aria-label="delete"
                      onClick={event => handleDelete(event, props.data)}
                      size="small"
                      style={{ textTransform: 'none' }}
                      variant="contained"
                    >
                      <DeleteIcon style={{ color: 'red' }} />
                    </IconButton>
                  }
                </>
              ),
              // eslint-disable-next-line react/display-name
              Pagination: props => (
                <TablePagination
                  {...props}
                  count={pagination.total}
                  onChangePage={(e, page) => handlePageChange(e, page + 1)}
                  page={pagination.page - 1}
                  style={{ overflow: 'hidden', float: 'right' }}
                />
              )
            }}
            data={listData}
            icons={tableIcons}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            options={{
              toolbar: false,
              search: false,
              showTitle: false,
              rowStyle: {
                boxShadow: '0px 2px #dcdcdc'
              },
              headerStyle: {
                backgroundColor: '#dcdcdc'
              }
            }}
          />
          <div className={classes.inputPage}>
            <TextField
              inputProps={{ style: { textAlign: 'center', height: '10px' } }}
              margin="dense"
              onBlur={handleBlur}
              onChange={handlePageInputChange}
              style={{ width: '60px', marginTop: '0' }}
              value={pageInput}
              variant="outlined"
            />
            <span>/ {Math.ceil(pagination.total / pagination.limit)}</span>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

Punch.propTypes = {
  canDelete: PropTypes.bool,
  canUpdate: PropTypes.bool,
};

export default Punch;

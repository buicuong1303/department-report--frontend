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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { TablePagination, TextField } from '@material-ui/core';
import { forwardRef } from 'react';
// import { makeStyles } from "@material-ui/core";
import ToolBar from '../../components/ToolBar';
import { makeStyles } from '@material-ui/styles';
import CustomizedDialogs from './components/Dialog';
import { AuthGuard, DialogDelete } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDataPhoneAction,
  getDataPhoneAction,
  updateDataPhoneAction
} from './Phone.asyncActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import apiStatus from 'utils/apiStatus';
import { clearStatePhone } from './Phone.slice';
import { isNumeric } from 'utils/validateNumber';
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
const Phone = props => {
  // eslint-disable-next-line
  const { canUpdate, canDelete } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [infoDelete, setInfoDelete] = useState({
    id: '',
    title: '',
    message: '',
    open: false
  });
  const [recordEditing, setRecordEditing] = useState(null);

  const status = useSelector(state => state.dataCenter.phone.status);
  const listData = useSelector(state => state.dataCenter.phone.listData);
  const pagination = useSelector(state => state.dataCenter.phone.pagination);
  const message = useSelector(state => state.dataCenter.phone.message);

  const [filterData, setFilterData] = useState({
    selectedAgents: null,
    from: null,
    to: null,
    on: null
  });
  const [filterPage, setFilterPage] = useState({ page: 1, limit: 10 });

  const [pageInput, setPageInput] = useState(1);

  const showSnackbar = (message, status) =>
    enqueueSnackbar(message, { variant: status });

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
    if (+value !== pageInput) handlePageChange(e, value);
  };

  const handlePageChange = (e, page) => {
    setFilterPage({...filterPage, page: +page });
    setPageInput(+page);
  };

  const handleChangeRowsPerPage = value => {
    setFilterPage({ page: 1, limit: value });
    setPageInput(1);
  };

  const handleClose = state => {
    setOpenEdit(state);
    setRecordEditing(null);
  };

  const handleEdit = (event, data) => {
    let itemEditing = { ...listData.find(item => item.id === data.id) };
    Object.keys(itemEditing).forEach(prop => {
      if (itemEditing[prop] === null || itemEditing[prop] === undefined)
        itemEditing[prop] = '';
    });
    // itemEditing.dateTimeCall =  moment(itemEditing.dateTimeCall).format('YYYY-MM-DDTHH:mm');
    setRecordEditing(itemEditing);
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
    const actionResult = await dispatch(deleteDataPhoneAction(infoDelete.id));
    const { id } = unwrapResult(actionResult);
    if (id) {
      setFilterPage({ ...filterPage });
    }
    setInfoDelete({ open: false, title: '', message: '' });
  };
  const handleCloseConfirm = () => {
    setInfoDelete({ open: false, title: '', message: '' });
  };
  const handleSubmit = async values => {
    dispatch(updateDataPhoneAction({ id: recordEditing.id, data: values }));
    setOpenEdit(false);
    setRecordEditing(null);
  };

  const handleChangeFilterData = values => {
    setFilterData({ ...filterData, ...values });
  };

  const handleGetFilterData = () => {
    dispatch(
      getDataPhoneAction({
        page: filterPage.page,
        limit: filterPage.limit,

        from: filterData.from,
        to: filterData.to,
        on: filterData.on,
        agentsId:
          filterData.selectedAgents &&
          filterData.selectedAgents.map(item => item.value)
      })
    );
  };

  useEffect(() => {
    const fetchDataPhone = async () => {
      dispatch(
        getDataPhoneAction({
          page: filterPage.page,
          limit: filterPage.limit,

          from: filterData.from,
          to: filterData.to,
          on: filterData.on,
          agentsId:
            filterData.selectedAgents &&
            filterData.selectedAgents.map(item => item.value)
        })
      );
    };
    fetchDataPhone();
    // eslint-disable-next-line
  }, [filterPage]);


  useEffect(() => {
    if (status === apiStatus.PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
      message && showSnackbar(message, status);
    }
    // eslint-disable-next-line
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(clearStatePhone());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AuthGuard requestPermissions={[permissionAuth.VIEW_ALL_PHONE_DATA]}>
      <div className={classes.root}>
        <ToolBar
          filterData={filterData}
          onChangeFilterData={handleChangeFilterData}
          onGetFilterData={handleGetFilterData}
        />
        <DialogDelete
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirmDelete}
          open={infoDelete.open}
          title={infoDelete.title}
        />
        <CustomizedDialogs
          onClose={handleClose}
          onSubmit={handleSubmit}
          open={openEdit}
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
                title: 'Agent',
                field: 'agent',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Call id',
                field: 'callId',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'DateTime',
                field: 'dateTimeCall',
                headerStyle: { whiteSpace: 'nowrap' }
              },

              {
                title: 'Duration',
                field: 'duration',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'In/Out',
                field: 'inOrOut',
                headerStyle: { whiteSpace: 'nowrap' }
              },
              {
                title: 'Line',
                field: 'line',
                headerStyle: { whiteSpace: 'nowrap' }
              }
            ]}
            components={{
              // eslint-disable-next-line react/display-name
              Action: props => (
                <>
                  {canUpdate && (
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
                  )}
                  {canDelete && (
                    <IconButton
                      aria-label="delete"
                      onClick={event => handleDelete(event, props.data)}
                      size="small"
                      style={{ textTransform: 'none' }}
                      variant="contained"
                    >
                      <DeleteIcon style={{ color: 'red' }} />
                    </IconButton>
                  )}
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
            data={JSON.parse(JSON.stringify(listData))}
            icons={tableIcons}
            isLoading={loading}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            options={{
              pageSize:10,
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
            totalCount={50}
          />
          <div className={classes.inputPage}>
            <TextField
              inputProps={{ style: { textAlign: 'center', height: '10px' } }}
              margin="dense"
              onBlur={handleBlur}
              onChange={handlePageInputChange}
              style={{ width: '30px', marginTop: '0' }}
              value={pageInput}
              // variant="outlined"
            />
            <span>/ {Math.ceil(pagination.total / pagination.limit)}</span>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

Phone.propTypes = {
  canDelete: PropTypes.bool,
  canUpdate: PropTypes.bool
};

export default Phone;

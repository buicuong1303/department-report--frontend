import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import {
  deleteDataPhoneAction,
  getDataPhoneAction,
  updateDataPhoneAction
} from './Phone.asyncActions';

//*reducer handle
const phoneSlice = createSlice({
  name: 'data-center-phone',
  initialState: {
    status: null,
    error: null,
    message: null,
    listData: [],
    pagination: {
      page: 1,
      limit: 5,
      total: 0
    }
  },
  reducers: {
    clearStatePhone: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.listData = [];
    }
  },
  extraReducers: {
    //* get data
    [getDataPhoneAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataPhoneAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message ='';
      const { data, pagination: newPagination } = action.payload;
      if (data && newPagination) {
        const newData = data.map(item => {
          return {
            ...item,
            agent: item.agent.firstName + ' ' + item.agent.lastName,
            dateTimeCall:
              item.dateTimeCall.slice(0, item.dateTimeCall.indexOf('T')) +
              `${item.dateTimeCall}:00`.substr(item.dateTimeCall.indexOf('T'), 9)
          };
        });
        state.listData = newData;
        state.pagination = newPagination;
      }
    },
    [getDataPhoneAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Get data fail';
      }
      state.error = true;
    },
    //* update data
    [updateDataPhoneAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataPhoneAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Update success';
      let newData = action.payload;
      if (newData.id) {
        newData = {
          ...newData,
          agent:
            newData.agent &&
            newData.agent.firstName + ' ' + newData.agent.lastName,
          dateTimeCall:
            newData.dateTimeCall.slice(0, newData.dateTimeCall.indexOf('T')) +
            `${newData.dateTimeCall}:00`.substr(newData.dateTimeCall.indexOf('T'), 9)
        };
        const index = state.listData.findIndex(item => item.id === newData.id);
        if (index < 0) return;
        const newArrayData = [
          ...state.listData.slice(0, index),
          newData,
          ...state.listData.slice(index + 1)
        ];
        state.listData = newArrayData;
      }
    },
    [updateDataPhoneAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Update fail';
      }
      state.error = true;
    },
    //* delete data
    [deleteDataPhoneAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataPhoneAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Deleted success';
    },
    [deleteDataPhoneAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Delete data fail';
      }
      state.error = true;
    }
  }
});

// eslint-disable-next-line
const { actions, reducer } = phoneSlice;

const { clearStatePhone } = actions;

export { clearStatePhone };
export default reducer;

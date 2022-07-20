import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import {
  deleteDataEmailAction,
  getDataEmailAction,
  updateDataEmailAction
} from './Email.asyncActions';
// import {
//   getUserInfo,
// } from 'store/asyncActions/sessionAsyncAction';
// import apiStatus from 'utils/apiStatus';

//*reducer handle
const emailSlice = createSlice({
  name: 'session',
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
    clearStateEmail: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.selectedAgents = [];
    }
  },
  extraReducers: {
    //* validate file
    [getDataEmailAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataEmailAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.message = '';
      state.error = false;
      const { data, pagination: newPagination } = action.payload;
      if (data && newPagination) {
        const newData = data.map(item => {
          return {
            ...item,
            agent:
              item.agent && item.agent.firstName + ' ' + item.agent.lastName,
            sent:
              item.sent &&
              item.sent.slice(0, 10),
            received:
              item.received &&
              item.received.slice(0, 10)
          };
        });
        state.listData = newData;
        state.pagination = newPagination;
      }
    },
    [getDataEmailAction.rejected]: (state, action) => {
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
    [updateDataEmailAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataEmailAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Update data success';
      let newData = action.payload;
      if (newData.id) {
        newData = {
          ...newData,
          agent:
            newData.agent &&
            newData.agent.firstName + ' ' + newData.agent.lastName,
          sent:
            newData.sent &&
            newData.sent.slice(0, 10),
          received:
            newData.received &&
            newData.received.slice(0, 10)
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
    [updateDataEmailAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Update data fail';
      }
      state.error = true;
    },
    //* delete data
    [deleteDataEmailAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataEmailAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.message = 'Delete data success';
      state.error = false;
    },
    [deleteDataEmailAction.rejected]: (state, action) => {
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
const { actions, reducer } = emailSlice;

const {
  clearStateEmail,
  addSelectedAgentEmail,
  removeSelectedAgentEmail,
  setSelectedAgentEmail,
  clearSelectedAgentEmail
} = actions;

export {
  clearStateEmail,
  addSelectedAgentEmail,
  removeSelectedAgentEmail,
  setSelectedAgentEmail,
  clearSelectedAgentEmail
};
export default reducer;

import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { deleteDataInboundCallAction, getDataInboundCallAction, updateDataInboundCallAction } from './IC.asyncActions';
// import {
//   getUserInfo,
// } from 'store/asyncActions/sessionAsyncAction';
// import apiStatus from 'utils/apiStatus';

//*reducer handle
const icSlice = createSlice({
  name: 'data-center-IC',
  initialState: {
    status: null,
    error: null,
    message: null,
    selectedAgents:[],
    listData: [],
    pagination:{
      page: 1,
      limit: 5,
      total: 0
    }
  },
  reducers:{
    clearStateIC: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.listData = [];
    }
  },
  extraReducers: {
    // //* get data
    [getDataInboundCallAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataInboundCallAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = '';

      const { data, pagination: newPagination } = action.payload;
      if(data && newPagination){
        const newData = data.map(item => {
          return {
            ...item,
            agent: item.agent && item.agent.firstName + ' ' + item.agent.lastName,
            createdBy:
              item.createdBy &&
              item.createdBy.firstName + ' ' + item.createdBy.lastName,
            updatedBy:
              item.updatedBy &&
              item.updatedBy.firstName + ' ' + item.updatedBy.lastName,
            dateTimeIC:
              item.dateTimeIC.slice(0, item.dateTimeIC.indexOf('T')) +
              `${item.dateTimeIC}:00`.substr(item.dateTimeIC.indexOf('T'), 9)
          };
        });
        state.listData = newData;
        state.pagination = newPagination;
      }
    },
    [getDataInboundCallAction.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      }else{
        state.status = apiStatus.ERROR;
        state.message = 'Get data fail';
      }
      state.error = true;
    },
    //* update data
    [updateDataInboundCallAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataInboundCallAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.message = 'Update data success';
      let newData = action.payload;
      if (newData.id) {
        newData = {
          ...newData,
          agent: `${newData.agent.firstName} ${newData.agent.lastName}`,
          dateTimeIC:
          newData.dateTimeIC.slice(0, newData.dateTimeIC.indexOf('T')) +
          `${newData.dateTimeIC}:00`.substr(newData.dateTimeIC.indexOf('T'), 9)
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
    [updateDataInboundCallAction.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      }else{
        state.status = apiStatus.ERROR;
        state.message = 'Update data fail';
      }
      state.error = true;
    },
    //* delete data
    [deleteDataInboundCallAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataInboundCallAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Deleted success';
    },
    [deleteDataInboundCallAction.rejected]: (state, action) => {
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
const { actions, reducer } = icSlice;

const { clearStateIC } = actions;

export { clearStateIC };

// const {
//   clearStateSession,
// } = actions;

// export {
//   clearStateSession,
// }
export default reducer;

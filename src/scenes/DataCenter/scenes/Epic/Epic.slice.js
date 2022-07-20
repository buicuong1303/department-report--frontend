import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import {
  getDataEpicAction,
  updateDataEpicAction,
  deleteDataEpicAction
} from './Epic.asyncActions';

//* reducer handle
const epicSlice = createSlice({
  name: 'data-center-epic',
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
    clearStateEpic: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.listData = [];
    }
  },
  extraReducers: {
    //* get data
    [getDataEpicAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataEpicAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = '';

      const { data, pagination: newPagination } = action.payload;
      if(data && newPagination){
        const newData = data.map(item => {
          return {
            ...item,
            createdBy:
              item.createdBy &&
              item.createdBy.firstName + ' ' + item.createdBy.lastName,
            updatedBy:
              item.updatedBy &&
              item.updatedBy.firstName + ' ' + item.updatedBy.lastName,
            createdTime:
              item.createdTime &&
              item.createdTime.slice(0, 10),
            updatedTime:
              item.updatedTime &&
              item.updatedTime.slice(0, 10)
  
          };
        });
        state.listData = newData;
        state.pagination = newPagination;
      }
    },
    [getDataEpicAction.rejected]: (state, action) => {
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
    [updateDataEpicAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataEpicAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Update data success';
      let newData = action.payload;
      if (newData.id) {
        newData = {
          ...newData,
          createdBy:
            newData.createdBy &&
            newData.createdBy.firstName + ' ' + newData.createdBy.lastName,
          updatedBy:
            newData.updatedBy &&
            newData.updatedBy.firstName + ' ' + newData.updatedBy.lastName,
          createdTime:
            newData.createdTime &&
            newData.createdTime.slice(0, 10),
          updatedTime:
            newData.updatedTime &&
            newData.updatedTime.slice(0, 10)

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
    [updateDataEpicAction.rejected]: (state, action) => {
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
    [deleteDataEpicAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataEpicAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Delete data success';
    },
    [deleteDataEpicAction.rejected]: (state, action) => {
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
const { actions, reducer } = epicSlice;

const { clearStateEpic } = actions;

export { clearStateEpic };
export default reducer;

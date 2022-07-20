import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import {
  deleteDataPunchAction,
  getDataPunchAction,
  updateDataPunchAction
} from './Punch.asyncActions';

//*reducer handle
const punchSlice = createSlice({
  name: 'data-center-punch',
  initialState: {
    status: null,
    error: null,
    message: null,
    selectedAgents: []
  },
  reducers: {
    clearStatePunch: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: {
    //* get data
    [getDataPunchAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataPunchAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
    },
    [getDataPunchAction.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = true;
      state.message = action.payload
        ? action.payload.error.message
        : 'get data fail';

    },
    //* update data
    [updateDataPunchAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataPunchAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
    },
    [updateDataPunchAction.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = true;
      state.message = action.payload
        ? action.payload.error.message
        : 'update data fail';
    },
    //* delete data
    [deleteDataPunchAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataPunchAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
    },
    [deleteDataPunchAction.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = true;
      state.message = action.payload
        ? action.payload.error.message
        : 'delete data fail';
    }
  }
});

// eslint-disable-next-line
const { actions, reducer } = punchSlice;

const { clearStatePunch } = actions;

export { clearStatePunch };
export default reducer;

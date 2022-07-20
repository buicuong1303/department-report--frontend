/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { getActivityLog, getUserInApps } from './Log.asyncActions';
import apiStatus from 'utils/apiStatus';
const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState: {
    status: null,
    error: null,
    message: null,
  },
  reducers: {
    clearStateActivityLog: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: {
    [getActivityLog.pending]: state => {
      state.status = apiStatus.PENDING;
    },
    [getActivityLog.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
    },
    [getActivityLog.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload
      }else{
        state.status = apiStatus.ERROR;
        state.message = 'get data fail';
      }
      state.error = true;
    },

    [getUserInApps.pending]: state => {
      state.status = apiStatus.PENDING;
    },
    [getUserInApps.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
    },
    [getUserInApps.rejected]: (state, action) => {
      if(!action.payload) state.status = apiStatus.TIMEOUT;
      else{
        state.status = apiStatus.ERROR;
      }
      state.error = true;
      state.message = action.payload ? action.payload.error.message: 'Some wrong';
    }
  }
});

const { reducer, actions } = activityLogSlice;
const { clearStateActivityLog } = actions;
export { clearStateActivityLog };
export default reducer;

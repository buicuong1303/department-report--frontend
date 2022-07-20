/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { createEmailTeam, getEmailTeam, getEmailTeams, updateEmailTeam, deleteEmailTeam } from './EmailTeams.asyncActions';

//*reducer handle
const emailTeamSlice = createSlice({
  name: 'emailTeam',

  initialState: {
    status: null,
    error: null,
    message: null,

    emailTeams: [],
    emailTeam: null,

    backdrop: null,
  },

  reducers: {
    clearError: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    },
    clearStateEmailTeam: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;

      state.emailTeams = [];
      state.emailTeam = null;

      state.backdrop = null;
    }
  },

  extraReducers: {
    //* create email team
    [createEmailTeam.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [createEmailTeam.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.emailTeams.unshift(action.payload);
      state.message = 'Create email team success';
    },
    [createEmailTeam.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Create data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* get list email team
    [getEmailTeams.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getEmailTeams.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.emailTeams = action.payload;
    },
    [getEmailTeams.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* get email team
    [getEmailTeam.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getEmailTeam.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.emailTeam = action.payload;
    },
    [getEmailTeam.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* update email team
    [updateEmailTeam.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [updateEmailTeam.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.emailTeams = action.payload;
      state.message = 'Update email team success';
    },
    [updateEmailTeam.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Delete data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* delete email team
    [deleteEmailTeam.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [deleteEmailTeam.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.emailTeams = action.payload;
      state.message = 'Delete email team success';
    },
    [deleteEmailTeam.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Delete data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },
  }
});

// eslint-disable-next-line
const { actions, reducer } = emailTeamSlice;

const {
  clearStateEmailTeam, clearError
} = actions;

export {
  clearStateEmailTeam, clearError
};

export default reducer;

/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { createAgent, getAgent, getAgents, updateAgent, deleteAgent } from './Agents.asyncActions';

//*reducer handle
const agentSlice = createSlice({
  name: 'agent',

  initialState: {
    status: null,
    error: null,
    message: null,

    agents: [],
    agent: null,

    backdrop: null,
  },

  reducers: {
    clearError: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    },

    clearStateAgent: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;

      state.agents = [];
      state.agent = null;

      state.backdrop = null;
    }
  },

  extraReducers: {
    //* create agent
    [createAgent.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [createAgent.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.agents.unshift(action.payload);
      state.message = 'Create agent success';
    },
    [createAgent.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* get list agent
    [getAgents.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getAgents.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.agents = action.payload;
    },
    [getAgents.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* get agent
    [getAgent.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getAgent.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.agent = action.payload;
    },
    [getAgent.rejected]: (state, action) => {
      state.backdrop = null;
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
    },

    //* update agent
    [updateAgent.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [updateAgent.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.agents = action.payload;
      state.message = 'Update agent success';
    },
    [updateAgent.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = Array.isArray(action.payload.error.message) ? action.payload.error.message[0] : action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* delete agent
    [deleteAgent.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [deleteAgent.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.agents = action.payload;
      state.message = 'Delete agent success';
    },
    [deleteAgent.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
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
const { actions, reducer } = agentSlice;

const {
  clearStateAgent, clearError
} = actions;

export {
  clearStateAgent, clearError
};

export default reducer;

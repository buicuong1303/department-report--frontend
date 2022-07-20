import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { getDepartments, getAgents } from './Mixin.asynActions';

//* reducer handle
const mixinSlice = createSlice({
  name: 'data-center-mixin',
  initialState: {
    status: null,
    error: null,
    message: null,
    agents: [],
    departments: [],
  },
  reducers: {

    clearStateMixin: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: {
    //* get data
    [getDepartments.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDepartments.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      let departmentData = [];
      if (action.payload.length > 0) {
        departmentData = action.payload.map(item => {
          const agentsActive = [];
          if (item.agents.length > 0) {
            item.agents.forEach(element => {
              if (element.status === 'active' && element.isPrimary === true) {
                agentsActive.push({
                  value: element.id,
                  label: element.firstName + ' ' + element.lastName
                });
              }
            });
          }
          return {
            value: item.id,
            label: item.name,
            agents: agentsActive
          };
        });
      }

      state.departments = departmentData;
    },
    [getDepartments.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'get data fail';
      }
      state.error = true;
    },

    [getAgents.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getAgents.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.agents = action.payload;
      let agentsData = [];
      if (action.payload.length > 0) {
        action.payload.forEach(item => {
          if (item.status === 'active') {
            agentsData.push({
              value: item.id,
              label: `${item.firstName} ${item.lastName}`
            });
          }
        });
      }
    },
    [getAgents.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'get data fail';
      }
      state.error = true;
    }
  }
});

// eslint-disable-next-line
const { actions, reducer } = mixinSlice;

const {

  clearStateMixin
} = actions;

export {
  clearStateMixin
};
export default reducer;

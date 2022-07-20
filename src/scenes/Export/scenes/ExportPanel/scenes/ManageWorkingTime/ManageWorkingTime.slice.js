import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import moment from 'moment';
import { AddPunchOfAgent, getAgentsManageWorkingTime, getDepartments, getPunchOfAgent, updatePunchOfAgent } from './ManageWorkingTime.asyncActions';
// import {
//   getUserInfo,
// } from 'store/asyncActions/sessionAsyncAction';
// import apiStatus from 'utils/apiStatus';

//*reducer handle
const manageWorkingTimeSlice = createSlice({
  name: 'export/manageWorkingTime',
  initialState: {
    agents:[],
    agentsBackup:[],
    PunchOfAgent:[],
    departments:[],

    editDialogStatus:null,
    addDialogStatus:null,

    status: null,
    error: null,
    message: null,
  },
  reducers:{
    clearStateEditDialog(state){
      state.editDialogStatus = null;
      state.message = null;
    },
    ResetFilterAction(state){
      state.PunchOfAgent = [];
      state.status = null;
      state.message = null;
      state.editDialogStatus = null;
      state.addDialogStatus = null;
      state.error = null;
    },
    selectDepartment(state,departmentsId){
      const listAgents = [];
      if(departmentsId.payload !== 'empty'){
        state.departments.forEach(item => {
          if(item.id === departmentsId.payload){
            item.agents.forEach(element => {
              if(element.isPrimary){
                listAgents.push(element);
              }
            });
          }
        });
        state.agents = listAgents;
      }else{
        state.agents = state.agentsBackup;
      }
    },
    clearStateExport(state){
      state.PunchOfAgent = [];
      state.status = null;
      state.message = null;
      state.editDialogStatus = null;
      state.addDialogStatus = null;
      state.error = null;
      state.agents = [];
      state.agentsBackup = [];
      state.departments = [];
    }
  },
  extraReducers:{
    //*Get Agent
    [getAgentsManageWorkingTime.pending]: (state, action) => {
      state.editDialogStatus = null;
      state.addDialogStatus = null;
      state.status = apiStatus.PENDING;
    },
    [getAgentsManageWorkingTime.fulfilled]: (state, action) => {
      state.agents = action.payload;
      state.agentsBackup = action.payload;
      state.status = apiStatus.SUCCESS;
      state.message = 'Get agent success !!';
    },
    [getAgentsManageWorkingTime.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Get agents fail !!';
    },

    //*Get Punch Of Agent
    [getPunchOfAgent.pending]: (state, action) => {
      state.editDialogStatus = null;
      state.addDialogStatus = null;
      state.status = apiStatus.PENDING;
    },
    [getPunchOfAgent.fulfilled]: (state, action) => {
      state.PunchOfAgent = action.payload;
      state.status = apiStatus.SUCCESS;
      state.message = 'Get punch of agent success !!';
    },
    [getPunchOfAgent.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Get Punch of Agent fail !!';
    },

    //*Update Punch Of Agent
    [updatePunchOfAgent.pending]: (state, action) => {
      state.status = null;
      state.addDialogStatus = null;
      state.editDialogStatus = apiStatus.PENDING;
    },
    [updatePunchOfAgent.fulfilled]: (state, action) => {
      state.PunchOfAgent = state.PunchOfAgent.map(item => {
        if(item.id === action.payload.id){
          action.payload.punchDate = moment(action.payload.punchDate,'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DD');
          return action.payload;
        }
        return item;
      });
      state.editDialogStatus = apiStatus.SUCCESS;
      state.message = 'Update punch of agent success !!';
    },
    [updatePunchOfAgent.rejected]: (state, action) => {
      state.editDialogStatus = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Update Punch of Agent fail !!';

    },

    //*Add Punch Of Agent
    [AddPunchOfAgent.pending]: (state, action) => {
      state.status = null;
      state.editDialogStatus = null;
      state.addDialogStatus = apiStatus.PENDING;
    },
    [AddPunchOfAgent.fulfilled]: (state, action) => {
      state.addDialogStatus = apiStatus.SUCCESS;
      state.message = 'Add punch of agent success !!';
    },
    [AddPunchOfAgent.rejected]: (state, action) => {
      state.addDialogStatus = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Add Punch of Agent fail !!';
    },

    //*Get departments
    [getDepartments.pending]: (state, action) => {
      state.addDialogStatus = null;
      state.editDialogStatus = null;
      state.status = apiStatus.PENDING;
    },
    [getDepartments.fulfilled]: (state, action) => {
      const departmentData = [];
      state.status = apiStatus.SUCCESS;
      if(action.payload.length > 0){
        action.payload.forEach(item => {
          if(item.status === 'active'){
            departmentData.push(item);
          }
        });
      }
      state.departments = departmentData;
      state.message = 'Get department success !!';
    },
    [getDepartments.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Get departments fail !!';
    },
  }
});



// eslint-disable-next-line
const { actions, reducer } = manageWorkingTimeSlice;

const {
  clearStateEditDialog,
  ResetFilterAction,
  selectDepartment,
  clearStateExport
} = actions;

export {
  clearStateEditDialog,
  ResetFilterAction,
  selectDepartment,
  clearStateExport
};
export default reducer;

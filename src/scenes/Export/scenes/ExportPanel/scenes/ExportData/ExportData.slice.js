import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { getAgentByDepartmentType, getDepartmentsExportData, getExportData } from './ExportData.asyncActions';

//*reducer handle
const exportDataSlice = createSlice({
  name: 'exportData',
  initialState: {
    selectedAgents: [],
    status: null,
    error: null,
    message: null,
  },
  reducers: {
    addSelectedAgentExportData: (state, action) => {
      state.selectedAgents.push(action.payload);
    },
    removeSelectedAgentExportData: (state, action) => {
      const index = state.selectedAgents.findIndex((item) => {
        return item.value === action.payload.value;
      });
      state.selectedAgents.splice(index, 1);
    },

    setSelectedAgentExportData: (state, action) => {
      state.selectedAgents = action.payload;
    },
    clearSelectedAgentExportData: (state) => {
      state.selectedAgents = [];
    },

    clearStateExportData: (state) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.selectedAgents = [];
    }
  },
  extraReducers:{
    //* get Agents
    [getAgentByDepartmentType.pending]: (state) => {
      state.status = apiStatus.PENDING;
      state.error = null;
      state.message = null;
    },
    [getAgentByDepartmentType.fulfilled]: (state) => {
      state.status = apiStatus.SUCCESS;
      state.message = 'get agents success';
    },
    [getAgentByDepartmentType.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.message = null;
      state.error = action.payload
        ? action.payload.error.message
        : 'get agents fail';
    },

    //* get Departments
    [getDepartmentsExportData.pending]: (state) => {
      state.status = apiStatus.PENDING;
    },
    [getDepartmentsExportData.fulfilled]: (state) => {
      state.status = apiStatus.SUCCESS;
      state.message = 'get departments success';
    },
    [getDepartmentsExportData.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'get department fail';
    },

    //* get Export Data
    [getExportData.pending]: (state) => {
      state.status = apiStatus.PENDING;
      state.message = null;
      state.error = null;
    },
    [getExportData.fulfilled]: (state) => {
      state.status = apiStatus.SUCCESS;
      state.message = 'get export data success';
    },
    [getExportData.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.message = null;
      state.error = action.payload
        ? action.payload.error.error
        : 'get data fail';
    },
  }
});

const { actions, reducer } = exportDataSlice;

const {
  clearStateExportData,
  addSelectedAgentExportData,
  removeSelectedAgentExportData,
  setSelectedAgentExportData,
  clearSelectedAgentExportData
} = actions;

export {
  clearStateExportData,
  addSelectedAgentExportData,
  removeSelectedAgentExportData,
  setSelectedAgentExportData,
  clearSelectedAgentExportData
};
export default reducer;

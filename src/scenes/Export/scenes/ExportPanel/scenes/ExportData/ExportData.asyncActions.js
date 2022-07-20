import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, exportDataApi, mondayApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getAgentsExport = createAsyncThunk(
  'exportData/getAgents',
  async (params, props) => {
    try {
      const response = await agentApi.getAgents();
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.email.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);

const getDepartmentsExportData = createAsyncThunk(
  'exportData/getDepartments',
  async (data, props) => {
    try {
      //* get departments
      const response = await departmentApi.getDepartments();

      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getExportData = createAsyncThunk(
  'exportData/getExportData',
  async (data, props) => {
    try {
      //* get departments
      const response = await exportDataApi.getExportData(data);

      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getAgentByDepartmentType = createAsyncThunk(
  'exportData/getAgentByDepartmentType',
  async (data, props) => {
    try {
      //* get departments
      const response = await departmentApi.getAgentByDepartmentType(data);

      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getExportMonday = createAsyncThunk(
  'exportData/getExportMonday',
  async (data, props) => {
    try {
      //* get departments
      console.log(data);
      const response = await mondayApi.exportMonday(data);
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  getAgentsExport,
  getDepartmentsExportData,
  getExportData,
  getAgentByDepartmentType,
  getExportMonday
};

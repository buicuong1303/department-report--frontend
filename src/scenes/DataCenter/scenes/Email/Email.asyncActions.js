import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, emailApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';
const getDataEmailAction = createAsyncThunk(
  'data-center-email/getDataEmail',
  async (params, props) => {
    try {
      const response = await emailApi.getDataEmail(params);
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
const deleteDataEmailAction = createAsyncThunk(
  'data-center-email/deleteDataEmail',
  async (params, props) => {
    try {
      const response = await emailApi.deleteDataEmail(params);
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

const updateDataEmailAction = createAsyncThunk(
  'data-center-email/updateDataEmail',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await emailApi.updateDataEmail(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getDepartmentsEmail = createAsyncThunk(
  'data-center-email/getDepartments',
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

const getAgentsEmail = createAsyncThunk(
  'data-center-email/getAgents',
  async (data, props) => {
    try {
      //* get agents
      const response = await agentApi.getAgents();

      //* get departments in agents
      // const departmentsInAgents = await Promise.all(
      //   response.data.map((item) => {
      //     return agentApi.getDepartmentsInAgent(item.id);
      //   })
      // );

      //* mix data agents
      const agents = response.data.map((item, index) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          originalName: item.originalName,
          status: item.status,
          // departments: [...departmentsInAgents[index].data]
        };
      });

      return agents;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
export {
  getDataEmailAction,
  deleteDataEmailAction,
  updateDataEmailAction,
  getDepartmentsEmail,
  getAgentsEmail
};

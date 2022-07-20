import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, inboundCallApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getDataInboundCallAction = createAsyncThunk(
  'data-center-ic/getDataInboundCall',
  async (params, props) => {
    try {
      const response = await inboundCallApi.getDataInboundCall(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.ic.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);
const deleteDataInboundCallAction = createAsyncThunk(
  'data-center-ic/Action',
  async (params, props) => {
    try {
      const response = await inboundCallApi.deleteDataInboundCall(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.ic.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);
const updateDataInboundCallAction = createAsyncThunk(
  'data-center-ic/updateDataInboundCall',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await inboundCallApi.updateDataInboundCall(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
const getDepartmentsIC = createAsyncThunk(
  'data-center-ic/getDepartments',
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
const getAgentsIC = createAsyncThunk(
  'data-center-ic/getAgents',
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
      const agents = response.data.map((item) => {
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
  getDataInboundCallAction,
  deleteDataInboundCallAction,
  updateDataInboundCallAction,
  getDepartmentsIC,
  getAgentsIC
};

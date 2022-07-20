import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, epicApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getDataEpicAction = createAsyncThunk(
  'data-center-epic/getDataEpic',
  async (params, props) => {
    try {
      const response = await epicApi.getDataEpic(params);
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
const deleteDataEpicAction = createAsyncThunk(
  'data-center-epic/deleteDataEpic',
  async (params, props) => {
    try {
      const response = await epicApi.deleteDataEpic(params);
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

const updateDataEpicAction = createAsyncThunk(
  'data-center-epic/updateDataEpic',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await epicApi.updateDataEpic(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
const getDepartmentsEpic = createAsyncThunk(
  'data-center-epic/getDepartments',
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
const getAgentsEpic = createAsyncThunk(
  'data-center-epic/getAgents',
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
  getDataEpicAction,
  deleteDataEpicAction,
  updateDataEpicAction,
  getAgentsEpic,
  getDepartmentsEpic
};

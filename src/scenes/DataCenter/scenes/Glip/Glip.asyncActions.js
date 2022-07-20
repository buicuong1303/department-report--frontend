import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, glipApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getDataGlipAction = createAsyncThunk(
  'data-center-glip/getDataGlip',
  async (params, props) => {
    try {

      const response = await glipApi.getDataGlip(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.glip.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);
const deleteDataGlipAction = createAsyncThunk(
  'data-center-glip/deleteDataGlip',
  async (params, props) => {
    try {
      const response = await glipApi.deleteDataGlip(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.glip.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);

const updateDataGlipAction = createAsyncThunk(
  'data-center-glip/updateDataGlip',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await glipApi.updateDataGlip(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
const getDepartmentsGlip = createAsyncThunk(
  'data-center-glip/getDepartments',
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
const getAgentsGlip = createAsyncThunk(
  'data-center-glip/getAgents',
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
  getDataGlipAction,
  deleteDataGlipAction,
  updateDataGlipAction,
  getDepartmentsGlip,
  getAgentsGlip
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi, departmentApi, phoneApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getDataPhoneAction = createAsyncThunk(
  'data-center-phone/getDataPhone',
  async (params, props) => {
    try {
      const response = await phoneApi.getDataPhone(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.phone.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);
const deleteDataPhoneAction = createAsyncThunk(
  'data-center-phone/deleteDataPhone',
  async (params, props) => {
    try {
      const response = await phoneApi.deleteDataPhone(params);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().dataCenter.phone.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false
  }
);

const updateDataPhoneAction = createAsyncThunk(
  'data-center-phone/updateDataPhone',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await phoneApi.updateDataPhone(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
const getDepartmentsPhone = createAsyncThunk(
  'data-center-phone/getDepartments',
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
const getAgentsPhone = createAsyncThunk(
  'data-center-phone/getAgents',
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
  getDataPhoneAction,
  deleteDataPhoneAction,
  updateDataPhoneAction,
  getDepartmentsPhone,
  getAgentsPhone
};

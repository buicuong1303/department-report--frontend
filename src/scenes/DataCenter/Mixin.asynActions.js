import { createAsyncThunk } from '@reduxjs/toolkit';
import {agentApi, departmentApi} from 'services/apis';
const getDepartments = createAsyncThunk(
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
const getAgents = createAsyncThunk(
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
export { getDepartments, getAgents };

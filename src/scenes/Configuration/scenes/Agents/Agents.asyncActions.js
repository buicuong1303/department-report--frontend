/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentApi } from 'services/apis';
import compareArray from 'utils/compareArray';
import { isEqual } from 'lodash';

const createAgent = createAsyncThunk(
  'agent/createAgent',
  async (data, props) => {
    try {
      //* create agent
      const response = await agentApi.createAgent(data.agent);

      //* add departments to agent
      const departmentsInAgentId = {
        departmentIds: [...data.agent.departments.map(item => item.id)]
      };
      let departmentsInAgent = {
        data: []
      };
      if(departmentsInAgentId.departmentIds.length > 0){
        departmentsInAgent = await agentApi.addDepartmentsToAgent(response.data.id, departmentsInAgentId);
      }
      

      //* mix data agent
      const agent = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        firstNameSpecial: response.data.firstNameSpecial,
        originalName: response.data.originalName,
        status: response.data.status,
        isPrimary: response.data.isPrimary,
        departments: departmentsInAgent.data.length > 0 ?  [...departmentsInAgent.data] : []
      };

      return agent;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getAgents = createAsyncThunk(
  'agent/getAgents',
  async (data, props) => {
    try {
      //* get agents
      const response = await agentApi.getAgents();

      const agents = response.data.map((item, index) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          firstNameSpecial: item.firstNameSpecial,
          originalName: item.originalName,
          status: item.status,
          isPrimary: item.isPrimary,
          departments: item.departments
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

const getAgent = createAsyncThunk(
  'agent/getAgent',
  async (data, props) => {
    try {
      //* get agent
      const response = await agentApi.getAgent(data.id);

      const agent = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        firstNameSpecial: response.data.firstNameSpecial,
        originalName: response.data.originalName,
        status: response.data.status,
        isPrimary: response.data.isPrimary,
        departments: response.data.departments
      };

      return agent;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const updateAgent = createAsyncThunk(
  'agent/updateAgent',
  async (data, props) => {
    try {
      //* update departments in agent
      const oldDepartmentsId = data.agent.oldDepartments ? data.agent.oldDepartments.map(item => item.id) : [];
      const newDepartmentsId = data.agent.newDepartments ? data.agent.newDepartments.map(item => item.id) : [];
      const departmentsInAgentId = compareArray(oldDepartmentsId, newDepartmentsId);
      const departmentsInAgentUpdateId = {
        departmentDeleteIds: departmentsInAgentId.listItemDelete,
        departmentAddIds: departmentsInAgentId.listItemAdd
      };
      if (!isEqual(oldDepartmentsId, newDepartmentsId)) {
        console.log('call 1');
        await agentApi.updateDepartmentsInAgent(
          data.id,
          departmentsInAgentUpdateId
        );
      } else{
        delete data.agent['oldDepartments'];
        delete data.agent['newDepartments'];
      }

      //* update agent

      const response = await agentApi.updateAgent(data.id, data.agent);

      const agents = response.data.map((item, index) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          firstNameSpecial: item.firstNameSpecial,
          originalName: item.originalName,
          status: item.status,
          isPrimary: item.isPrimary,
          departments: item.departments
        };
      });

      return agents;

    } catch (err) {
      console.log(err)
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const deleteAgent = createAsyncThunk(
  'agent/deleteAgent',
  async (data, props) => {
    try {
      //* delete agent
      const response = await agentApi.deleteAgent(data.id);

      const agents = response.data.map((item, index) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          firstNameSpecial: item.firstNameSpecial,
          originalName: item.originalName,
          status: item.status,
          isPrimary: item.isPrimary,
          departments: item.departments
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
  createAgent,
  getAgents,
  getAgent,
  updateAgent,
  deleteAgent,
};

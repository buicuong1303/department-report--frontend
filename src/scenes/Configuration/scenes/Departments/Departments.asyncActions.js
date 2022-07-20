/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { departmentApi } from 'services/apis';
import compareArray from 'utils/compareArray';
import { isEqual } from 'lodash';
const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (data, props) => {
    try {
      //* create department
      const response = await departmentApi.createDepartment(data.department);

      //* add agents to department
      const agentsInDepartmentId = {
        agentIds: [...data.department.agents.map(item => item.id)]
      };
      let departmentsInAgent = {
        data: []
      };
      if (agentsInDepartmentId.agentIds.length > 0)
        departmentsInAgent = await departmentApi.addAgentsToDepartment(
          response.data.id,
          agentsInDepartmentId
        );

      //* mix department data
      const department = {
        id: response.data.id,
        name: response.data.name,
        status: response.data.status,
        agents:
          departmentsInAgent.data.length > 0 ? [...departmentsInAgent.data] : []
      };

      return department;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (data, props) => {
    try {
      //* get departments
      const response = await departmentApi.getDepartments();

      const departments = response.data.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          status: item.status,
          agents: item.agents
        };
      });

      return departments;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getDepartment = createAsyncThunk(
  'department/getDepartment',
  async (data, props) => {
    try {
      //* get department
      const response = await departmentApi.getDepartment(data.id);

      return {
        id: response.data.id,
        name: response.data.name,
        status: response.data.status,
        agents: response.data.agents
      };
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (data, props) => {
    try {
      //* update agents in department
      const oldAgentsId = data.department.oldAgents.map(item => item.id);
      const newAgentsId = data.department.newAgents.map(item => item.id);
      const agentsInDepartmentId = compareArray(oldAgentsId, newAgentsId);
      const agentsInDepartmentUpdateId = {
        agentDeleteIds: agentsInDepartmentId.listItemDelete,
        agentAddIds: agentsInDepartmentId.listItemAdd
      };

      if (!isEqual(oldAgentsId, newAgentsId)) {
        await departmentApi.updateAgentsInDepartment(
          data.id,
          agentsInDepartmentUpdateId
        );
      } else {
        delete data.department['oldAgents'];
        delete data.department['newAgents'];
      }

      //*  update department
      const response = await departmentApi.updateDepartment(
        data.id,
        data.department
      );

      const departments = response.data.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          status: item.status,
          agents: item.agents
        };
      });

      return departments;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (data, props) => {
    try {
      //* delete department
      const response = await departmentApi.deleteDepartment(data.id);

      const departments = response.data.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          status: item.status,
          agents: item.agents
        };
      });

      return departments;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
};

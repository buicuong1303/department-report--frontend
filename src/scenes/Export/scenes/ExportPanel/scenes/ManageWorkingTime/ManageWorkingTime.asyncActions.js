import { createAsyncThunk } from '@reduxjs/toolkit';
import { departmentApi, punchApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getAgentsManageWorkingTime = createAsyncThunk(
  'manageWorkingTimeAction/getAgent',
  async (params, props) => {
    try {
      const response = await punchApi.getAgentsPunch();
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().export.panel.manageWorkingTime.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false //* default false: don't dispatch reject action
  }
);

const getPunchOfAgent = createAsyncThunk(
  'manageWorkingTimeAction/getPunchOfAgent',
  async (data, props) => {
    try {
      const response = await punchApi.getPunchOfAgent(data);
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().export.panel.manageWorkingTime.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false //* default false: don't dispatch reject action
  }
);

const updatePunchOfAgent = createAsyncThunk(
  'manageWorkingTimeAction/updatePunchOfAgent',
  async (data, props) => {
    try {
      const response = await punchApi.updatePunchOfAgent(data);
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().export.panel.manageWorkingTime.editDialogStatus === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false //* default false: don't dispatch reject action
  }
);

const AddPunchOfAgent = createAsyncThunk(
  'manageWorkingTimeAction/addPunchOfAgent',
  async (data, props) => {
    try {
      const response = await punchApi.addPunchOfAgent(data);
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().export.panel.manageWorkingTime.addDialogStatus === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false //* default false: don't dispatch reject action
  }
);

const getDepartments = createAsyncThunk(
  'manageWorkingTimeAction/getDepartments',
  async(data,props) => {
    try{
      //* get departments
      const response = await departmentApi.getDepartments();
      return response.data;
    } catch (err){
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  getAgentsManageWorkingTime,
  getPunchOfAgent,
  updatePunchOfAgent,
  AddPunchOfAgent,
  getDepartments
};

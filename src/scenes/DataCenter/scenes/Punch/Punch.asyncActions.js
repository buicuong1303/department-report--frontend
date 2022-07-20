import { createAsyncThunk } from '@reduxjs/toolkit';
import { punchApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getDataPunchAction = createAsyncThunk(
  'data-center-punch/getDataPunch',
  async (params, props) => {
    try {
      const response = await punchApi.getDataPunch(params);
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
const deleteDataPunchAction = createAsyncThunk(
  'data-center-punch/deleteDataPunch',
  async (params, props) => {
    try {
      const response = await punchApi.deleteDataPunch(params);
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

const updateDataPunchAction = createAsyncThunk(
  'data-center-punch/updateDataPunch',
  async (params, props) => {
    try {
      const { id, data } = params;
      const response = await punchApi.updateDataPunch(id, data);
      return response.data;
    } catch (error) {
      const newError = { ...error };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);
export { getDataPunchAction, deleteDataPunchAction, updateDataPunchAction };

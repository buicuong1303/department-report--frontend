import { createAsyncThunk } from '@reduxjs/toolkit';
import { logApi } from 'services/apis';

const getActivityLog = createAsyncThunk(
  'activityLog/getActivityLog',
  async (params, props) => {
    try {
      const response = await logApi.getActivityLog(params);
      return response.data;
      
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getUserInApps = createAsyncThunk(
  'activityLog/getUserInApps',
  async (params, props) => {
    try {
      const response = await logApi.getUserInApps();
      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export { getActivityLog, getUserInApps };

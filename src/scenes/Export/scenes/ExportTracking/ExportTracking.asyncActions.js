import { createAsyncThunk } from '@reduxjs/toolkit';
import { exportDataApi } from 'services/apis';
import apiStatus from 'utils/apiStatus';

const getExportsTracking = createAsyncThunk(
  'exportTrackingAction/getExports',
  async (data, props) => {
    try {
      const response = await exportDataApi.getExports(data);
      return response.data;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  },
  {
    condition: (data, { getState }) => {
      if (getState().export.tracking.status === apiStatus.PENDING) {
        return false;
      }
    },
    dispatchConditionRejection: false //* default false: don't dispatch reject action
  }
);

export {
  getExportsTracking
};

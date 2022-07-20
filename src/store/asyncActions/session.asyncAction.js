import { sessionApi } from 'services/apis';
import { createAsyncThunk } from '@reduxjs/toolkit';

//*thunk action
const getUserInfo = createAsyncThunk(
  'session/getUserInfo',
  // eslint-disable-next-line no-unused-vars
  async (data, props) => {
    try {
      const response = await sessionApi.getUserInfo();
      const userInfo = response.data;
      return userInfo;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  getUserInfo,
};

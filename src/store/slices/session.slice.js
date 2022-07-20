import { createSlice } from '@reduxjs/toolkit';
import {
  getUserInfo,
} from 'store/asyncActions/session.asyncAction';
import apiStatus from 'utils/apiStatus';

//*reducer handle
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    status: null,
    error: null,
    message: null,
    isSetToken:false,
    userInfo: {
      permissions: [],
    },
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    clearStateSession: (state, action) => {
      state.userInfo = {
        permissions: [],
      };
      state.status = null;
      state.error = null;
      state.message = null;
    },
    setIsSetToken: (state, action) => {
      state.isSetToken = action.payload;
    },
    setSessionStatus:(state, action) => {
      state.status = action.payload;
    }

  },
  extraReducers: {
    //* get user information
    // eslint-disable-next-line no-unused-vars
    [getUserInfo.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.userInfo = {
        ...action.payload,
        permissions: action.payload.permissions
      };
    },
    [getUserInfo.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.error.message;
    },
  }
});

const { actions, reducer } = sessionSlice;

const {
  clearStateSession,
  setIsSetToken,
  setSessionStatus

} = actions;

export {
  clearStateSession,
  setIsSetToken,
  setSessionStatus,

};
export default reducer;

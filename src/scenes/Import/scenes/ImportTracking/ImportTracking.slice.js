import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import apiStatus from 'utils/apiStatus';

//*reducer handle
const importTrackingSlice = createSlice({
  name: 'importTracking',

  initialState: {
    status: null,
    error: null,
    message: null,
  },

  reducers: {
    clearState: (state) => {
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },

  extraReducers: {}
});

const { actions, reducer } = importTrackingSlice;

const {
  clearState,
} = actions;

export {
  clearState,
};

export default reducer;

import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import apiStatus from 'utils/apiStatus';
import { getExportsTracking } from './ExportTracking.asyncActions';

//*reducer handle
const exportTrackingSlice = createSlice({
  name: 'exportTracking',

  initialState: {
    exports: [],
    recordLength: null,
    status: null,
    error: null,
    message: null,
  },

  reducers: {
    clearStateTracking: (state) => {
      state.exports= [];
      state.recordLength = null;
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },

  extraReducers: {
    //*Get Punch Of Agent
    // eslint-disable-next-line no-unused-vars
    [getExportsTracking.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getExportsTracking.fulfilled]: (state, action) => {
      // state.exports = action.payload;
      state.exports = state.exports.concat(action.payload.listReport);
      state.recordLength = action.payload.length;
      state.status = apiStatus.SUCCESS;
      state.message = 'Get exports success !!';
    },
    [getExportsTracking.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.error = action.payload
        ? action.payload.error.message
        : 'Get exports fail !!';
    },
  }
});

const { actions, reducer } = exportTrackingSlice;

const {
  clearStateTracking,
} = actions;

export {
  clearStateTracking,
};

export default reducer;

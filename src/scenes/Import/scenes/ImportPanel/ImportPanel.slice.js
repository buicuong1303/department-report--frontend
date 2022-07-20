/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { importFile, validateFile } from './ImportPanel.asyncActions';

//*reducer handle
const importPanelSlice = createSlice({
  name: 'importPanel',

  initialState: {
    status: null,
    error: null,
    message: null,
  },

  reducers: {
    clearState: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    }
  },

  extraReducers: {
    //* validate file
    [validateFile.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [validateFile.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.message = `'${action.meta.arg.file.name}' file has been validated`;
    },
    [validateFile.rejected]: (state, action) => {
      if (action.payload) {
        state.status = apiStatus.ERROR;
        state.error = action.payload.error.message;
      }
    },

    //* import file
    [importFile.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [importFile.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.message = `'${action.meta.arg.file.name}' file has been uploaded`;
    },
    [importFile.rejected]: (state, action) => {
      if (action.payload) {
        state.status = apiStatus.ERROR;
        state.error = action.payload.error.message;
      }
    }
  }
});

// eslint-disable-next-line
const { actions, reducer } = importPanelSlice;

const {
  clearState,
} = actions;

export {
  clearState,
};

export default reducer;

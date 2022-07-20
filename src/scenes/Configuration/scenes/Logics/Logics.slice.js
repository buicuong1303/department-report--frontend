/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { getConfigs, updateConfigs, deleteMainLine } from './Logics.asyncActions';

//*reducer handle
const configSlice = createSlice({
  name: 'config',

  initialState: {
    status: null,
    error: null,
    message: null,

    configs: {
      deskPhone: { id: '', key: '', value: '' },
      serveDurationGlip: { id: '', key: '', value: '' },
      startWork: { id: '', key: '', value: '' },
      endWork: { id: '', key: '', value: '' },
      fullTime: { id: '', key: '', value: '' },
      partTime: { id: '', key: '', value: '' },
      mainLines: [],
    },

    backdrop: null,
  },

  reducers: {
    clearStateConfigs: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;

      state.configs = {
        deskPhone: { id: '', key: '', value: '' },
        serveDurationGlip: { id: '', key: '', value: '' },
        startWork: { id: '', key: '', value: '' },
        endWork: { id: '', key: '', value: '' },
        fullTime: { id: '', key: '', value: '' },
        partTime: { id: '', key: '', value: '' },
        mainLines: [],
      };

      state.backdrop = null;
    }
  },

  extraReducers: {
    //* get list config
    [getConfigs.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getConfigs.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.configs = action.payload;
    },
    [getConfigs.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = action.payload;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* update config
    [updateConfigs.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [updateConfigs.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      if(action.payload.mainLines) {
        action.payload.mainLines.forEach(newItem => {
          let index = state.configs.mainLines.findIndex(oldItem => oldItem.id === newItem.id);

          if(index > -1){
            state.configs.mainLines[index] = {...state.configs.mainLines[index], ...newItem};
          } else {
            state.configs.mainLines = [...state.configs.mainLines, newItem];
          }
        });

        delete action.payload['mainLines'];

      }
      state.configs = {...state.configs, ...action.payload};
      state.message = 'Update config success';
    },
    [updateConfigs.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'Update data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* delete main line
    [deleteMainLine.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [deleteMainLine.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.configs = action.payload;
      state.message = 'Delete main line success';
    },
    [deleteMainLine.rejected]: (state, action) => {
      if(!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail'
      }else{
        state.status = apiStatus.ERROR;
        state.message = action.payload;
      }
      state.error = true;
      state.backdrop = null;
    },
  }
});

// eslint-disable-next-line
const { actions, reducer } = configSlice;

const {
  clearStateConfigs,
} = actions;

export {
  clearStateConfigs,
};

export default reducer;

import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import {
  deleteDataGlipAction,
  getDataGlipAction,
  updateDataGlipAction
} from './Glip.asyncActions';
import moment from 'moment';
const subTime = (start, end) => {
  const startTime = start.split(':');
  const endTime = end.split(':');

  const totalStartSeconds =
    parseInt(startTime[0]) * 3600 +
    parseInt(startTime[1]) * 60 +
    parseInt(startTime[2]);
  const totalSecondsEnd =
    parseInt(endTime[0]) * 3600 +
    parseInt(endTime[1]) * 60 +
    parseInt(endTime[2]);
  let totalSeconds = totalSecondsEnd - totalStartSeconds;
  let durationHour = Math.floor(totalSeconds / 3600);
  let durationMinute = Math.floor((totalSeconds / 60) % 60);
  let durationSecond = Math.floor(totalSeconds % 60);

  durationHour = `0${durationHour}`.slice(-2);
  durationMinute = `0${durationMinute}`.slice(-2);
  durationSecond = `0${durationSecond}`.slice(-2);
  return [durationHour, durationMinute, durationSecond].join(':');
};
//* reducer handle
const glipSlice = createSlice({
  name: 'data-center-glip',
  initialState: {
    status: null,
    error: null,
    message: null,
    listData: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  },
  reducers: {
    clearStateGlip: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
      state.listData = [];
    }
  },
  extraReducers: {
    //* get data
    [getDataGlipAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [getDataGlipAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = '';
      const { data, pagination: newPagination } = action.payload;
      if (data && newPagination) {
        const newData = data.map(item => {
          return {
            ...item,
            agent:
              item.agent && item.agent.firstName + ' ' + item.agent.lastName,
            whoAssign:
              item.whoAssign &&
              item.whoAssign.firstName + ' ' + item.whoAssign.lastName,
            createdBy:
              item.createdBy &&
              item.createdBy.firstName + ' ' + item.createdBy.lastName,
            waitingTime:
              item.servedTime && subTime(item.createdTime, item.servedTime),
            servingDuration:
              item.completedTime && subTime(item.servedTime, item.completedTime)
          };
        });
        state.listData = newData;
        state.pagination = newPagination;
      }
    },

    [getDataGlipAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Get data fail';
      }
      state.error = true;
    },
    //* update data
    [updateDataGlipAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [updateDataGlipAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Update data success';
      let data = action.payload;
      if (data.id) {
        data = {
          ...data,
          agent: data.agent && data.agent.firstName + ' ' + data.agent.lastName,
          whoAssign:
            data.whoAssign &&
            data.whoAssign.firstName + ' ' + data.whoAssign.lastName,
          createdBy:
            data.createdBy &&
            data.createdBy.firstName + ' ' + data.createdBy.lastName,
          waitingTime:
            data.servedTime && subTime(data.createdTime, data.servedTime),
          servingDuration:
            data.completedTime && subTime(data.servedTime, data.completedTime),
          dateGlipMaster: moment(data.dateGlipMaster).format('YYYY-MM-DD')
        };
        const index = state.listData.findIndex(item => item.id === data.id);
        if (index < 0) return;
        const newArray = [
          ...state.listData.slice(0, index),
          data,
          ...state.listData.slice(index + 1)
        ];
        state.listData = newArray;
      }
    },
    [updateDataGlipAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Update data fail';
      }
      state.error = true;
    },
    //* delete data
    [deleteDataGlipAction.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
    },
    [deleteDataGlipAction.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.error = false;
      state.message = 'Delete data success';
    },
    [deleteDataGlipAction.rejected]: (state, action) => {
      if (!action.payload) {
        state.status = apiStatus.TIMEOUT;
        state.message = action.payload;
      } else {
        state.status = apiStatus.ERROR;
        state.message = 'Delete data fail';
      }
      state.error = true;
    }
  }
});

// eslint-disable-next-line
const { actions, reducer } = glipSlice;

const { clearStateGlip } = actions;
export { clearStateGlip };
export default reducer;

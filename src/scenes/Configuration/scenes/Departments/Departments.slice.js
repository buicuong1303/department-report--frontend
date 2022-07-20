/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import apiStatus from 'utils/apiStatus';
import { createDepartment, getDepartment, getDepartments, updateDepartment, deleteDepartment } from './Departments.asyncActions';

//*reducer handle
const departmentSlice = createSlice({
  name: 'department',

  initialState: {
    status: null,
    error: null,
    message: null,

    departments: [],
    department: null,

    backdrop: null,
  },

  reducers: {
    clearStateDepartment: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;

      state.departments = [];
      state.department = null;

      state.backdrop = null;
    },
    setDepartmentEditing: (state, action) => {
      state.departmentEditing = action.payload;
    }
  },

  extraReducers: {
    //* create department
    [createDepartment.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [createDepartment.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.departments.unshift(action.payload);
      state.message = 'Create department success';
    },
    [createDepartment.rejected]: (state, action) => {
      if(!action.payload.error) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* get list department
    [getDepartments.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getDepartments.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.departments = action.payload;
    },
    [getDepartments.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.backdrop = null;
      state.error = action.payload.error.message;
    },

    //* get department
    [getDepartment.pending]: (state, action) => {
      state.backdrop = apiStatus.PENDING;
    },
    [getDepartment.fulfilled]: (state, action) => {
      state.backdrop = null;
      state.department = action.payload;
    },
    [getDepartment.rejected]: (state, action) => {
      state.status = apiStatus.ERROR;
      state.backdrop = null;
      state.error = action.payload.error.message;
    },

    //* update department
    [updateDepartment.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [updateDepartment.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.departments = action.payload;
      state.message = 'Update department success';
    },
    [updateDepartment.rejected]: (state, action) => {
      if(!action.payload.error) {
        state.status = apiStatus.TIMEOUT;
        state.message = 'get data fail';
      }else{
        state.status = apiStatus.ERROR;
        state.message = action.payload.error.message;
      }
      state.error = true;
      state.backdrop = null;
    },

    //* delete department
    [deleteDepartment.pending]: (state, action) => {
      state.status = apiStatus.PENDING;
      state.backdrop = apiStatus.PENDING;
    },
    [deleteDepartment.fulfilled]: (state, action) => {
      state.status = apiStatus.SUCCESS;
      state.backdrop = null;
      state.departments = action.payload;
      state.message = 'Delete department success';
    },
    [deleteDepartment.rejected]: (state, action) => {
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
const { actions, reducer } = departmentSlice;

const {
  clearStateDepartment,
} = actions;

export {
  clearStateDepartment,
};

export default reducer;

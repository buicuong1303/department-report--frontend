/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { importFileApi, validateFileApi } from 'services/apis';

const validateFile = createAsyncThunk(
  'import/validateFile',
  async (data, props) => {
    try {
      const response = await validateFileApi.validate(data.file, data.type);
      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const importFile = createAsyncThunk(
  'import/importFile',
  async (data, props) => {
    try {
      const response = await importFileApi.importFile(data.file, data.type, data.fileName);
      return response.data;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  validateFile,
  importFile,
};

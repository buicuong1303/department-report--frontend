/* eslint-disable no-unused-vars */
import { Delete } from '@material-ui/icons';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { emailTeamApi } from 'services/apis';
import entityStatus from 'utils/entityStatus';

const createEmailTeam = createAsyncThunk(
  'emailTeam/createEmailTeam',
  async (data, props) => {
    try {
      const response = await emailTeamApi.createEmailTeam(data.emailTeam);

      const emailTeam = {
        id: response.data.id,
        displayName: response.data.displayName,
        emailAddress: response.data.emailAddress,
        status: response.data.status
      };

      return emailTeam;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getEmailTeams = createAsyncThunk(
  'emailTeam/getEmailTeams',
  async (data, props) => {
    try {
      const response = await emailTeamApi.getEmailTeams();

      const emailTeams = response.data.map(item => {
        return {
          id: item.id,
          displayName: item.displayName,
          emailAddress: item.emailAddress,
          status: item.status
        };
      });

      return emailTeams;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const getEmailTeam = createAsyncThunk(
  'emailTeam/getEmailTeam',
  async (data, props) => {
    try {
      const response = await emailTeamApi.getEmailTeam(data.id);

      const emailTeam = {
        id: response.data.id,
        displayName: response.data.displayName,
        emailAddress: response.data.emailAddress,
        status: response.data.status
      };

      return emailTeam;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const updateEmailTeam = createAsyncThunk(
  'emailTeam/updateEmailTeam',
  async (data, props) => {
    try {
      const response = await emailTeamApi.updateEmailTeam(data.id, data.emailTeam);

      const emailTeams = response.data.map(item => {
        return {
          id: item.id,
          displayName: item.displayName,
          emailAddress: item.emailAddress,
          status: item.status
        };
      });

      return emailTeams;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const deleteEmailTeam = createAsyncThunk(
  'emailTeam/deleteEmailTeam',
  async (data, props) => {
    try {

      const response = await emailTeamApi.deleteEmailTeam(data.id);
      const emailTeams = response.data.map(item => {
        return {
          id: item.id,
          displayName: item.displayName,
          emailAddress: item.emailAddress,
          status: item.status
        };
      });

      return emailTeams;

    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export {
  createEmailTeam,
  getEmailTeams,
  getEmailTeam,
  updateEmailTeam,
  deleteEmailTeam,
};

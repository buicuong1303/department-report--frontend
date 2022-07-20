import { createAsyncThunk } from '@reduxjs/toolkit';
import { logicApi } from 'services/apis';
import { isArray } from 'lodash';
import configType from 'utils/configType';
import { customCompareObject } from 'utils/customCompareObject';

const getConfigs = createAsyncThunk('logic/getConfigs', async (data, props) => {
  try {
    const response = await logicApi.getConfigs();

    const configsData = {
      deskPhone: {},
      serveDurationGlip: {},
      startWork: {},
      endWork: {},
      fullTime: {},
      partTime: {},
      mainLines: []
    };

    // eslint-disable-next-line
    response.data.map(item => {
      switch (item.type) {
        case configType.DESK_PHONE:
          configsData.deskPhone = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.SERVE_DURATION_GLIP:
          configsData.serveDurationGlip = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.START_WORK:
          configsData.startWork = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.END_WORK:
          configsData.endWork = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.FULL_TIME:
          configsData.fullTime = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.PART_TIME:
          configsData.partTime = {
            id: item.id,
            key: item.key,
            value: item.value
          };
          break;
        case configType.MAIN_LINE:
          configsData.mainLines.push({
            id: item.id,
            key: item.key,
            value: item.value
          });
          break;
        default:
      }
    });

    return configsData;
  } catch (err) {
    const newError = { ...err };
    const payload = { error: newError.response.data };
    return props.rejectWithValue(payload);
  }
});

const updateConfigs = createAsyncThunk(
  'logic/updateConfigs',
  async (data, props) => {
    try {
      let newData = [];

      let cleanData = customCompareObject(
        data.values,
        props.getState().configuration.logics.configs
      );
      for (const prop in cleanData) {
        if (!isArray(cleanData[prop])) newData.push(cleanData[prop]);
        else {
          // cleanData[prop].forEach(element => {
          //   newData.push(element);
          // });
          newData.push(...cleanData[prop]);
        }
      }

      // newData.push(data.values.deskPhone);
      // newData.push(data.values.serveDurationGlip);
      // newData.push(data.values.startWork);
      // newData.push(data.values.fullTime);
      // newData.push(data.values.partTime);
      const configsNeedUpdate = [
        ...newData
        // ...data.values.mainLines
      ];
      const response = await logicApi.updateConfigs(configsNeedUpdate);

      const configsData = {};

      // eslint-disable-next-line
      response.data.map(item => {
        switch (item.type) {
          case configType.DESK_PHONE:
            configsData.deskPhone = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.SERVE_DURATION_GLIP:
            configsData.serveDurationGlip = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.START_WORK:
            configsData.startWork = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.END_WORK:
            configsData.endWork = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.FULL_TIME:
            configsData.fullTime = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.PART_TIME:
            configsData.partTime = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.MAIN_LINE:

            configsData.mainLines = configsData.mainLines
              ? [
                ...configsData.mainLines,
                {
                  id: item.id,
                  key: item.key,
                  value: item.value
                }
              ]
              : [
                {
                  id: item.id,
                  key: item.key,
                  value: item.value
                }
              ];
            break;
          default:
        }
      });
      return configsData;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

const deleteMainLine = createAsyncThunk(
  'logic/deleteMainLine',
  async (data, props) => {
    try {
      const response = await logicApi.deleteMainLine(data);

      const configsData = {
        deskPhone: {},
        serveDurationGlip: {},
        startWork: {},
        fullTime: {},
        partTime: {},
        mainLines: []
      };

      // eslint-disable-next-line
      response.data.map(item => {
        switch (item.type) {
          case configType.DESK_PHONE:
            configsData.deskPhone = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.SERVE_DURATION_GLIP:
            configsData.serveDurationGlip = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.START_WORK:
            configsData.startWork = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.END_WORK:
            configsData.endWork = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.FULL_TIME:
            configsData.fullTime = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.PART_TIME:
            configsData.partTime = {
              id: item.id,
              key: item.key,
              value: item.value
            };
            break;
          case configType.MAIN_LINE:
            configsData.mainLines.push({
              id: item.id,
              key: item.key,
              value: item.value
            });
            break;
          default:
        }
      });

      return configsData;
    } catch (err) {
      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export { getConfigs, updateConfigs, deleteMainLine };

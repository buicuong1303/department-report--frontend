import axios from 'services/apis/axiosClient';

const getExportData = (data) => {
  return axios.post('/export', data);
};

const getExports = (data) => {
  return axios.get(`/export/tracking/${data.count}`);
};

export default {
  getExportData,
  getExports
};

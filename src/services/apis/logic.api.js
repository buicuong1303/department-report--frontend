import axios from 'services/apis/axiosClient';

const getConfigs = () => {
  return axios.get('/config-variable/');
};

const updateConfigs = (data) => {
  return axios.patch('/config-variable/', {configs: data});
};

const deleteMainLine = id => {
  return axios.delete(`/config-variable/${id}`);
};


export default {
  getConfigs,
  updateConfigs,
  deleteMainLine,
};

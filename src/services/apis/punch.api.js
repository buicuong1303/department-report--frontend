import axios from 'services/apis/axiosClient';
import * as qs from 'query-string';

const getAgentsPunch = () => {
  return axios.get('/data-punches/data/agents');
};

const getPunchOfAgent = (data) => {
  return axios.get('/data-punches',{params: {from:data.from, to:data.to, id:data.id}});
};

const updatePunchOfAgent = (data) => {
  return axios.patch(`/data-punches/${data.id}`,data.content);
};

const addPunchOfAgent = (data) => {
  return axios.post('/data-punches',data.content);
};

const getDataPunch = queries => {
  Object.keys(queries).forEach(key => (queries[key] === '' || queries[key] === null) && delete queries[key]);
  // console.log(queries);
  return axios.get(`/data-punches?${qs.stringify(queries)}`);
};

const deleteDataPunch = id => {
  return axios.delete(`/data-punches/${id}`);
};

const updateDataPunch = (id, data) => {
  return axios.patch(`/data-punches/${id}`, data);
};

export default {
  getDataPunch,
  deleteDataPunch,
  updateDataPunch,
  getAgentsPunch,
  getPunchOfAgent,
  updatePunchOfAgent,
  addPunchOfAgent
};

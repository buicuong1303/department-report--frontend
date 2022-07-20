import axios from 'services/apis/axiosClient';

const createAgent = (data) => {
  return axios.post('/agents/', data);
};

const getAgents = () => {
  return axios.get('/agents/');
};

const getAgent = (id) => {
  return axios.get(`/agents/${id}`);
};

const updateAgent = (id, data) => {
  return axios.patch(`/agents/${id}`, data);
};

const deleteAgent = id => {
  return axios.delete(`/agents/${id}`);
};

const addDepartmentsToAgent = (id, data) => {
  return axios.post(`/agents/${id}/departments`, data);
};

const getDepartmentsInAgent = id => {
  return axios.get(`/agents/${id}/departments`);
};

const updateDepartmentsInAgent = (id, data) => {
  return axios.patch(`/agents/${id}/departments`, data);
};

export default {
  createAgent,
  getAgents,
  getAgent,
  updateAgent,
  deleteAgent,

  addDepartmentsToAgent,
  getDepartmentsInAgent,
  updateDepartmentsInAgent,
};

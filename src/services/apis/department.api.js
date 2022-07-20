import axios from 'services/apis/axiosClient';

const createDepartment = (data) => {
  return axios.post('/departments/', data);
};

const getDepartments = () => {
  return axios.get('/departments/');
};

const getDepartment = (id) => {
  return axios.get(`/departments/${id}`);
};

const updateDepartment = (id, data) => {
  return axios.patch(`/departments/${id}`, data);
};

const deleteDepartment = id => {
  return axios.delete(`/departments/${id}`);
};

const addAgentsToDepartment = (id, data) => {
  return axios.post(`/departments/${id}/agents`, data);
};

const getAgentsInDepartment = id => {
  return axios.get(`/departments/${id}/agents`);
};

const updateAgentsInDepartment = (id, data) => {
  return axios.patch(`/departments/${id}/agents`, data);
};

const getAgentByDepartmentType = (type) => {
  return axios.get(`/departments/typedepartment/${type}/agents`);
};


export default {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,

  addAgentsToDepartment,
  getAgentsInDepartment,
  updateAgentsInDepartment,
  getAgentByDepartmentType
};

import axios from 'services/apis/axiosClient';

const createEmailTeam = (data) => {
  return axios.post('/email-teams/', data);
};

const getEmailTeams = () => {
  return axios.get('/email-teams/');
};

const getEmailTeam = (id) => {
  return axios.get(`/email-teams/${id}`);
};

const updateEmailTeam = (id, data) => {
  return axios.patch(`/email-teams/${id}`, data);
};

const deleteEmailTeam = id => {
  return axios.delete(`/email-teams/${id}`);
};


export default {
  createEmailTeam,
  getEmailTeams,
  getEmailTeam,
  updateEmailTeam,
  deleteEmailTeam,
};

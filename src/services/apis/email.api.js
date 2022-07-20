import axios from 'services/apis/axiosClient';

const getDataEmail = data => {
  // console.log(data);
  return axios.post('/data-emails/',data);
};

const deleteDataEmail = id => {
  return axios.delete(`/data-emails/${id}`);
};

const updateDataEmail = (id, data) => {
  return axios.patch(`/data-emails/${id}`, data);
};

export default {
  getDataEmail,
  deleteDataEmail,
  updateDataEmail
};

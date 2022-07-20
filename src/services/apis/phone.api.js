import axios from 'services/apis/axiosClient';

const getDataPhone = data => {
  // console.log(data);
  return axios.post('/data-phones/',data);
};

const deleteDataPhone = id => {
  return axios.delete(`/data-phones/${id}`);
};

const updateDataPhone = (id, data) => {
  return axios.patch(`/data-phones/${id}`, data);
};

export default {
  getDataPhone,
  deleteDataPhone,
  updateDataPhone
};

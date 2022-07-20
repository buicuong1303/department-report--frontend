import axios from 'services/apis/axiosClient';

const getDataGlip = data => {
  // console.log(data);
  return axios.post('/data-glips/',data);
};

const deleteDataGlip = id => {
  return axios.delete(`/data-glips/${id}`);
};

const updateDataGlip = (id, data) => {
  return axios.patch(`/data-glips/${id}`, data);
};

export default {
  getDataGlip,
  deleteDataGlip,
  updateDataGlip
};

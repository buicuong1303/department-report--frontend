import axios from 'services/apis/axiosClient';

const getDataEpic = data => {
  // console.log(data);
  return axios.post('/data-epics/',data);
};

const deleteDataEpic = id => {
  return axios.delete(`/data-epics/${id}`);
};

const updateDataEpic = (id, data) => {
  return axios.patch(`/data-epics/${id}`, data);
};

export default {
  getDataEpic,
  deleteDataEpic,
  updateDataEpic
};

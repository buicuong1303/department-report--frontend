import axios from 'services/apis/axiosClient';

const getDataInboundCall = data => {
  // console.log(data);
  return axios.post('/data-ics/',data);
};

const deleteDataInboundCall = id => {
  return axios.delete(`/data-ics/${id}`);
};

const updateDataInboundCall = (id, data) => {
  return axios.patch(`/data-ics/${id}`, data);
};

export default {
  getDataInboundCall,
  deleteDataInboundCall,
  updateDataInboundCall
};

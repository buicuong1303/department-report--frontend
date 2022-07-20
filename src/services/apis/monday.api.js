import axios from 'services/apis/axiosClient';

const exportMonday = (data) => {
  return axios.get(`/monday/download?from=${data.from}&&to=${data.to}&&id=${data.id}`);
};

export default {
  exportMonday,
};
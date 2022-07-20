/* eslint-disable no-unused-vars */
import axios from 'services/apis/axiosClient';

const getUserInfo = () => {
  return axios.get('/auth/user-info');
};

export default {
  getUserInfo,
};

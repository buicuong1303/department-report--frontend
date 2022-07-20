import axios from './axiosClient';
import * as qs from 'query-string';
const getActivityLog = query => {
  Object.keys(query).forEach(key => (query[key] === '' || query[key] === null) && delete query[key]);
  return axios.get(`/log-activities?${qs.stringify(query)}`);
};
const getUserInApps = () => {
  return axios.get('/log-activities/users');
};
export default {
  getActivityLog,
  getUserInApps
};

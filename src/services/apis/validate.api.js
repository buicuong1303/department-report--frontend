import axios from 'services/apis/axiosClient';

const validate = (file, type) => {
  var formData = new FormData();
  formData.append('file', file);
  return axios.post(`/validation/${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default {
  validate,
};

import axios from 'services/apis/axiosClient';

const importFile = (file, type, fileName) => {
  var formData = new FormData();
  formData.append('file', file);
  return axios.post(`/import/${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': `${fileName}`
    }
  });
};

export default {
  importFile,
};
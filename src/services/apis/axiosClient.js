import axios from 'axios';

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  config => {
    // config.timeout = 20000;
    const token = localStorage.getItem('accessToken');
    if(config.headers['Authorization'] === null || config.headers['Authorization'] === '' || config.headers['Authorization'] === undefined) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    //Any status code that lie within the rage of 2xx cause this function to trigger
    //Do something with response data
    if (response.data.code === '22003') {
      const newError = {
        response: {
          data: {
            error: 'Query Failed Error',
            message: 'Numeric field overflow',
            statusCode: 22003,
          }
        }
      };

      return Promise.reject(newError);
    }
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);
export default instance;

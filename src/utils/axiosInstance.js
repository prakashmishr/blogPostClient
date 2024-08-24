
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:   process.env.REACT_APP_SERVER_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

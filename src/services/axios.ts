// axiosInstance.js
import http from 'axios';

const axios = http.create({
  baseURL: 'http://192.168.0.8:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;

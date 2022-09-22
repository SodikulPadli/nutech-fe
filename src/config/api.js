// import axios here ...
import axios from 'axios';

// Create base URL API
export const API = axios.create({
  baseURL: process.env.SERVER_URL || 'https://nutech-backend.herokuapp.com/api/v1/' || 'http://localhost:5000/api/v1/',
});

// set auth token header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

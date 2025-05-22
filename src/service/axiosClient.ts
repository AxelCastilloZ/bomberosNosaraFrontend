import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosAuth = axios.create({
  baseURL: 'https://localhost:7155/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

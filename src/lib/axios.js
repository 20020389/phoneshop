import axios from 'axios';

export const http = axios.create({
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

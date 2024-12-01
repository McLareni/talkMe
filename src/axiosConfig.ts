import axios from 'axios';

export const URL = 'http://localhost:3000';

axios.defaults.baseURL = URL;

export function setToken(token: string) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default axios;

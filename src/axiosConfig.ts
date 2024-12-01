import axios from 'axios';

export const URL = 'http://localhost:3000';
// export const URL = 'https://6d9e-213-76-69-206.ngrok-free.app/';

axios.defaults.baseURL = URL;

export function setToken(token: string) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default axios;

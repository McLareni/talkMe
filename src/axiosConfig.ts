import axios from 'axios';

export const URL = import.meta.env.VITE_URL;
// export const URL = 'https://6d9e-213-76-69-206.ngrok-free.app';

axios.defaults.baseURL = URL;

export function setToken(token: string) {
  console.log('newToken', token);

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default axios;

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios, { setToken } from '../../axiosConfig';

export interface ILoginArgs {
  id: number;
  name: string;
  email: string;
  picture: string;
}

export const authUser = createAsyncThunk(
  'authUser',
  async (args: ILoginArgs) => {
    try {
      const response = await axios.post('/login', args);

      if (response.status !== 200) {
        console.log('Failed login');
      }

      console.log(response.data);

      setToken(response.data.accessToken);
      console.log('Auth API response:', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

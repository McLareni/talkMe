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

      setToken(response.data.accessToken);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'refreshToken',
  async (token: string) => {
    try {
      const response = await axios.post('/refresh-token', {
        refreshToken: token,
      });

      if (response.status !== 200) {
        console.log('Failed login');
      }

      console.log('new token');

      return response.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  }
);

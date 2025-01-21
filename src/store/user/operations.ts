import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URL } from '../../axiosConfig';
import { RootState } from '../index';

type ExtendedFriend = IFriend & { idChat?: number; request: boolean };

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('ngrok-skip-browser-warning', 'true');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUser: builder.query<ExtendedFriend, { idUser: string }>({
      query: ({ idUser }) => ({
        url: `user/${idUser}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;

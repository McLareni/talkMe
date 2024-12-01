import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URL } from '../../axiosConfig';
import { RootState } from '../index';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserChats: builder.query<any[], void>({
      query: () => ({ url: 'chats', method: 'GET' }),
    }),
    getUserChat: builder.query<IMessage[], string>({
      query: idChat => `chats/${idChat}`,
    }),
    getChatUsers: builder.query<any[], string>({
      query: (idChat: string) => `chats/${idChat}/users`,
    }),
    sendMessage: builder.mutation<any, { message: string; idChat: string }>({
      query: ({ message, idChat }) => ({
        url: `chats/${idChat}`,
        method: 'POST',
        body: { message },
      }),
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetUserChatQuery,
  useSendMessageMutation,
  useGetChatUsersQuery,
} = chatApi;

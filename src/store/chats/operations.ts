import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URL } from '../../axiosConfig';
import { ILoginArgs, refreshAccessToken } from '../auth/authOperation';
import { RootState } from '../index';

let isRefreshReload = false;

export const chatApi = createApi({
  reducerPath: 'chatApi',
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
    getUserChats: builder.query<any[], void>({
      query: () => ({
        url: 'chats',
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (error?.error?.status === 403) {
            const refreshToken = (getState() as RootState).auth.refreshToken;

            if (!isRefreshReload) {
              isRefreshReload = true;

              try {
                await dispatch(refreshAccessToken(refreshToken)).unwrap();
                dispatch(
                  chatApi.endpoints.getUserChats.initiate(undefined, {
                    forceRefetch: true,
                  })
                );
              } finally {
                isRefreshReload = false;
              }
            }
          }
        }
      },
    }),
    getUserChat: builder.query<
      IMessage[],
      { idChat: string; limit: number; offset: number }
    >({
      query: ({ idChat, limit, offset }) => ({
        url: `chats/${idChat}`,
        method: 'GET',
        params: { limit, offset },
      }),
      async onQueryStarted(params, { queryFulfilled, dispatch, getState }) {
        const { idChat, limit, offset } = params;

        try {
          await queryFulfilled;
        } catch (error: any) {
          if (error?.error?.status === 403) {
            const refreshToken = (getState() as RootState).auth.refreshToken;

            if (!isRefreshReload) {
              isRefreshReload = true;

              try {
                await dispatch(refreshAccessToken(refreshToken)).unwrap();
                dispatch(
                  chatApi.endpoints.getUserChat.initiate(
                    { idChat, limit, offset },
                    {
                      forceRefetch: true,
                    }
                  )
                );
              } finally {
                isRefreshReload = false;
              }
            }
          }
        }
      },
    }),
    getChatUsers: builder.query<{ ChatUser: ILoginArgs }[], string>({
      query: (idChat: string) => ({
        url: `chats/${idChat}/users`,
      }),
      async onQueryStarted(idChat, { queryFulfilled, dispatch, getState }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (error?.error?.status === 403) {
            const refreshToken = (getState() as RootState).auth.refreshToken;

            if (!isRefreshReload) {
              isRefreshReload = true;

              try {
                await dispatch(refreshAccessToken(refreshToken)).unwrap();
                dispatch(
                  chatApi.endpoints.getChatUsers.initiate(idChat, {
                    forceRefetch: true,
                  })
                );
              } finally {
                isRefreshReload = false;
              }
            }
          }
        }
      },
    }),
    sendMessage: builder.mutation<
      any,
      { message: string; idChat: string; time: any }
    >({
      query: ({ message, idChat, time }) => ({
        url: `chats/${idChat}`,
        method: 'POST',
        body: { message, time },
      }),
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetUserChatQuery,
  useSendMessageMutation,
  useGetChatUsersQuery,
  useLazyGetUserChatQuery,
} = chatApi;

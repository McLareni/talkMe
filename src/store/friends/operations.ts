import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URL } from '../../axiosConfig';
import { refreshAccessToken } from '../auth/authOperation';
import { RootState } from '../index';

let isRefreshReload = false;

export const friendApi = createApi({
  reducerPath: 'friendApi',
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
  tagTypes: ['MyFriendRequest', 'MyFriends'],
  endpoints: builder => ({
    getFriends: builder.query<{ getFriend: IFriend }[], void>({
      query: () => ({
        url: 'friends/getFriend',
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (error?.error?.status === 403) {
            const refreshToken = (getState() as RootState).auth.refreshToken;
            console.log('refetchToken');

            if (!isRefreshReload) {
              isRefreshReload = true;

              try {
                await dispatch(refreshAccessToken(refreshToken)).unwrap();
                dispatch(
                  friendApi.endpoints.getFriends.initiate(undefined, {
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
      providesTags: ['MyFriends'],
    }),
    deleteFriend: builder.mutation<string, number>({
      query: friendId => ({
        url: `friends/delete/${friendId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyFriends'],
    }),

    getNewFriends: builder.query<IFriend[], { filter: string; userID: number }>(
      {
        query: ({ filter, userID }) => ({
          url: `users?userID=${userID}&filter=${encodeURIComponent(filter)}`,
          method: 'GET',
        }),
      }
    ),
    getMyRequest: builder.query<
      { id: number; myFriendRequest: IFriend }[],
      void
    >({
      query: () => ({
        url: `friends/myFriendRequest`,
      }),
      providesTags: ['MyFriendRequest'],
    }),
    confirmRequest: builder.mutation<
      string,
      { friendId: number; userId: number }
    >({
      query: ({ friendId, userId }) => ({
        url: 'friends/confirmRequest',
        method: 'PUT',
        body: { friendId, userId },
      }),
      invalidatesTags: ['MyFriendRequest'],
    }),
    rejectRequest: builder.mutation<
      string,
      { friendId: number; userId: number }
    >({
      query: ({ friendId, userId }) => ({
        url: 'friends/rejectRequest',
        method: 'PUT',
        body: { friendId, userId },
      }),
      invalidatesTags: ['MyFriendRequest'],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetNewFriendsQuery,
  useGetMyRequestQuery,
  useConfirmRequestMutation,
  useRejectRequestMutation,

  useDeleteFriendMutation,
} = friendApi;

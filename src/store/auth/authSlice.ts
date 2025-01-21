import { createSlice } from '@reduxjs/toolkit';

import { authUser, refreshAccessToken } from './authOperation';

export interface IUser {
  user: { id: number; name: string; email: string; picture: string } | {};
  accessToken?: string;
  refreshToken?: string;
  isUser: boolean;
}

const initialState: IUser = {
  user: {},
  accessToken: undefined,
  refreshToken: undefined,
  isUser: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.user = {};
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isUser = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isUser = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;

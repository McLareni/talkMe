import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState: [] as number[],
  reducers: {
    setOnlineUser: (state, action: PayloadAction<number[]>) => {
      return action.payload;
    },
  },
});

export const { setOnlineUser } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;

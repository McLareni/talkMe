import { RootState } from '../index';

export const selectOnlineUsers = (state: RootState): number[] =>
  state.onlineUsers;

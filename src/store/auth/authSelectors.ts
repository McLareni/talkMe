import { RootState } from '../index';
import { IUser } from './authSlice';

export const selectIsUser = (state: RootState): boolean => state.auth.isUser;
export const selectUser = (state: RootState): IUser => state.auth;
export const selectUserId = (state: RootState): number => state.auth.user.id;

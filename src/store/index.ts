import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './auth/authSlice';
import { chatApi } from './chats/operations';
import { friendApi } from './friends/operations';
import onlineUsersSlice from './onlineUsers/onlineUsersSlice';
import { userApi } from './user/operations';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  [chatApi.reducerPath]: chatApi.reducer,
  onlineUsers: onlineUsersSlice,
  [friendApi.reducerPath]: friendApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(chatApi.middleware)
      .concat(friendApi.middleware)
      .concat(userApi.middleware),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

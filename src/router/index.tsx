import { createBrowserRouter } from 'react-router-dom';

import ChatLayout from '../components/Layouts/ChatLayout.tsx';
import FriendLayout from '../components/Layouts/FriendLayout.tsx';
import Chat from '../page/Chat.tsx';
import ChatNotSelected from '../page/ChatNotSelected.tsx';
import LoginPage from '../page/Login.tsx';
import MyFriend from '../page/MyFriend.tsx';
import MyRequest from '../page/MyRequests.tsx';
import UserProfile from '../page/UserProfile.tsx';
import LoginRouter from './privateRouter/LoginRouter.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LoginRouter />,
      children: [
        { path: '/profile', element: <h1>Profile</h1> },
        {
          path: '/chats',
          element: <ChatLayout />,
          children: [
            { index: true, element: <ChatNotSelected /> },
            { path: ':idChat', element: <Chat /> },
          ],
        },
        {
          path: '/friends',
          element: <FriendLayout />,
          children: [
            {
              index: true,
              element: <MyFriend />,
            },
            {
              path: 'requests',
              element: <MyRequest />,
            },
          ],
        },
        {
          path: 'user/:idUser',
          element: <UserProfile />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
    },
  }
);

export default router;

import { createBrowserRouter } from 'react-router-dom';

import ChatLayout from '../components/Layouts/ChatLayout.tsx';
import Chat from '../page/Chat.tsx';
import LoginPage from '../page/Login.tsx';
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
          children: [{ path: ':idChat', element: <Chat /> }],
        },
        { path: '/friends', element: <h1>Friends</h1> },
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

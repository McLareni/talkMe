import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import { selectUserId } from '../../store/auth/authSelectors';
import SideBar from '../SideBar/SideBar';
import { io, Socket } from 'socket.io-client';
import { URL } from '../../axiosConfig';

export let socket: Socket;

const Layout = () => {
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    socket = io(URL, {
      extraHeaders: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (userId) {
      socket.on('connect', () => {
        socket.emit('setOnline', userId);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="flex h-full">
      <SideBar />
      <main className="flex w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

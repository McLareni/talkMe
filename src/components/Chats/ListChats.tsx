import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/hooks';
import { setOnlineUser } from '../../store/onlineUsers/onlineUsersSlice';
import { socket } from '../Layouts/Layouts';
import ListItemChat from './ListItemChat';

interface IProps {
  chats?: any[];
}

const ListChat: React.FC<IProps> = ({ chats }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('getOnlineUsers', users => {
      console.log('get online users');
      dispatch(setOnlineUser(users));
    });

    socket.emit('getOnlineUsers');

    return () => {
      socket.off('getOnlineUsers');
    };
  }, [dispatch]);

  return (
    <ul className="mx-6 h-full overflow-y-auto-scroll scrollbar-hide">
      {chats?.map(chat => (
        <li key={chat.idChat}>
          <ListItemChat
            chat={{ idChat: chat.idChat, chatName: chat.chatName }}
            users={chat.users}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListChat;

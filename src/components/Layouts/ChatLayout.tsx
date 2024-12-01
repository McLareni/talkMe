import { Outlet } from 'react-router-dom';

import ListChat from '../Chats/ListChats';

const ChatLayout = () => {
  return (
    <>
      <aside className='w-1/4'>
        <input type="text" />
        <ListChat />
      </aside>
      <Outlet />
    </>
  );
};

export default ChatLayout;

import React from 'react';
import { NavLink } from 'react-router-dom';

import { ILoginArgs } from '../../store/auth/authOperation';

interface IProps {
  chat: IChat;
  users: ILoginArgs;
}

const ListItemChat: React.FC<IProps> = ({ chat, users }) => {
  return (
    <NavLink
      to={chat.idChat.toString()}
      className="bg-mainBlue rounded-2xl h-14 items-center pl-3 my-4 flex gap-2"
    >
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={users.picture}
      />
      <div className='h-full mt-4'>
        <h2 className='text-white text-[15px] font-semibold'>{chat.chatName}</h2>
      </div>
    </NavLink>
  );
};

export default ListItemChat;

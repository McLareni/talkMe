import React from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import { ILoginArgs } from '../../store/auth/authOperation';
import { useAppSelector } from '../../hooks/hooks';
import { selectOnlineUsers } from '../../store/onlineUsers/onlineUsersSelectors';
import ProfileImage, { Alphabet } from '../UI/ProfileImage';

interface IProps {
  chat: IChat;
  users: ILoginArgs;
}

const ListItemChat: React.FC<IProps> = ({ chat, users }) => {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const userOnline = onlineUsers?.find(user => user === users.id)

  return (
    <NavLink
      end
      to={chat.idChat.toString()}
      className={({ isActive }) =>
        clsx(
          'rounded-2xl w-64 h-14 items-center pl-3 my-4 flex gap-2 hover:bg-fiolet/40',
          isActive ? 'bg-fiolet' : 'bg-gray'
        )
      }
    >
      <div className="relative h-10 w-10">
        {/* <img
          className="h-full w-full rounded-full object-cover"
          src={users.picture || userPlaceholder}
        /> */}

        <div className='h-full w-full rounded-full overflow-hidden text-lg'>
          <ProfileImage letter={users.name[0] as Alphabet}/>
        </div>
        <div
          className={clsx(
            'w-3 h-3 rounded-full absolute bottom-0 right-0',
            userOnline ? 'bg-green-500 border border-gray' : ''
          )}
        ></div>
      </div>

      <div className="h-full mt-4">
        <h2 className="text-white text-[15px] font-semibold">
          {chat.chatName}
        </h2>
        {/* <p className='text-[10px] -mt-1'>@{users.name}</p> */}
      </div>
    </NavLink>
  );
};

export default ListItemChat;

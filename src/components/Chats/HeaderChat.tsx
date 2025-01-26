import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

import clsx from 'clsx';

import userPlaceholder from '../../../public/user-placeholder.png';
import { useAppSelector } from '../../hooks/hooks';
import { selectOnlineUsers } from '../../store/onlineUsers/onlineUsersSelectors';
import ProfileImage from '../UI/ProfileImage';

interface IProps {
  info?: any;
  openPopUp: () => void;
}

const HeaderChat: React.FC<IProps> = ({ info, openPopUp }) => {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const isOnline = onlineUsers.find(user => user === info?.ChatUser.id);

  console.log(info);
  return (
    <>
      <div className="w-full h-24 bg-mainBlue flex justify-between items-center px-3">
        <div className="flex gap-4">
          <div className="relative w-16 h-16">
            <div className="rounded-full w-full h-full overflow-hidden text-[25px]">
              <ProfileImage letter={info?.ChatUser.name[0]} />
            </div>
            {/* <img
              src={info?.ChatUser.picture || userPlaceholder}
              className="rounded-full w-full h-full"
            /> */}
            <div
              className={clsx(
                'w-4 h-4 rounded-full absolute bottom-0 right-0',
                isOnline ? 'bg-green-500 border border-gray' : ''
              )}
            ></div>
          </div>
          <div className="flex flex-col justify-center text-white">
            <h3 className="text-xl font-black">{info?.ChatUser.name || ''}</h3>
            <p className="text-base font-semibold">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <FiMoreHorizontal
          className="w-10 h-10 stroke-white rotate-90 cursor-pointer"
          onClick={openPopUp}
        />
      </div>
    </>
  );
};

export default HeaderChat;

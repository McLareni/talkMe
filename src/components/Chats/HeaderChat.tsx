import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IProps {
  info?: any[];
}

const HeaderChat: React.FC<IProps> = ({ info }) => {
  return (
    <>
      <div className="w-full h-24 bg-fiolet absolute top-0 flex justify-between items-center px-3">
        <div className="flex gap-4">
          <img
            src={info?.[0].ChatUser.picture || ''}
            className="rounded-full w-16 h-16"
          />
          <div className="flex flex-col justify-center text-white">
            <h3 className="text-xl font-black">
              {info?.[0].ChatUser.name || ''}
            </h3>
            <p className="text-base font-semibold">Online</p>
          </div>
        </div>
        <FiMoreHorizontal className="w-10 h-10 stroke-white rotate-90" />
      </div>
    </>
  );
};

export default HeaderChat;

import React from 'react';
import { IoPaperPlane } from 'react-icons/io5';
import { TbReload } from 'react-icons/tb';

import clsx from 'clsx';

import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/auth/authSelectors';
import { getTime } from '../../utils/formatTime';
import ProfileImage from '../UI/ProfileImage';

interface IProps {
  text: string;
  time: string;
  friendName: string;
  isYourMessage: boolean;
  sented?: 'NOT' | 'ERROR';
  reSend: (time: string, text: string) => void;
}

const Message: React.FC<IProps> = ({
  text,
  time,
  isYourMessage,
  friendName,
  sented,
  reSend,
}) => {
  const { user } = useAppSelector(selectUser);
  const handleReSend = async () => {
    reSend(time, text);
  };

  return (
    <div
      onClick={() => (sented === 'ERROR' ? handleReSend() : () => {})}
      className={clsx('flex flex-col py-1', {
        'items-end': isYourMessage,
        'items-start': !isYourMessage,
      })}
    >
      <div
        className={clsx(
          'max-w-[50%] w-fit flex flex-nowrap items-end justify-end',
          {
            'flex-row-reverse': !isYourMessage,
          }
        )}
      >
        <h2
          className={clsx(
            'rounded-3xl max-w-[90%] w-fit p-3 break-words mx-2',
            {
              'bg-[#BCD5FF]': isYourMessage,
              'bg-[#D9D9D9]': !isYourMessage,
              'bg-red-300': sented === 'ERROR',
            }
          )}
        >
          {text}
        </h2>

        <div className="w-7 h-7 rounded-full overflow-hidden">
          <ProfileImage
            letter={isYourMessage ? user?.name[0] || '' : friendName[0] || ''}
          />
        </div>

        {/* <img
          src={isYourMessage ? yourPhoto : friendPhoto}
          className="w-7 h-7 rounded-full"
        /> */}
        {sented === 'NOT' && (
          <IoPaperPlane className="rotate-45 ml-2 fill-mainBlue" />
        )}
        {sented === 'ERROR' && <TbReload className="ml-2 stroke-red-500" />}
      </div>

      <p className="text-xs">
        {sented === 'ERROR'
          ? ''
          : sented === 'NOT'
            ? 'Sending...'
            : getTime(time)}
      </p>
    </div>
  );
};

export default Message;

import React from 'react';

import clsx from 'clsx';

interface IProps {
  text: string;
  isYourMessage: boolean;
}

const Message: React.FC<IProps> = ({ text, isYourMessage }) => {
  return (
    <div
      className={clsx('flex', {
        'justify-end': isYourMessage,
        'justify-start': !isYourMessage,
      })}
    >
      <h2
        className={clsx('rounded-3xl w-fit p-2', {
          'bg-[#BCD5FF]': isYourMessage,
          'bg-[#D9D9D9]': !isYourMessage,
        })}
      >
        {text}
      </h2>
    </div>
  );
};

export default Message;

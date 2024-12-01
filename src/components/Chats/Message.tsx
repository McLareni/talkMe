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
        className={clsx('rounded-3xl max-w-[40%] w-fit p-3 break-words', {
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

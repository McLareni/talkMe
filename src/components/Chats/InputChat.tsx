import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';

import clsx from 'clsx';

import EmojiPickerCustom from './EmojiPicker';

interface IProps {
  sendMessageFn: (message: string) => void;
  emojiIsOpen: boolean;
  openEmoji: () => void;
  closeEmoji: () => void;
}

const InputChat: React.FC<IProps> = ({
  sendMessageFn,
  emojiIsOpen,
  openEmoji,
  closeEmoji,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleSend = () => {
    if ((inputRef.current?.value || '').length > 500) {
      setError(true);
    } else {
      setError(false);
      sendMessageFn(inputRef.current?.value || '');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleAddEmoji = ({ emoji }: { emoji: any }) => {
    if (inputRef.current) {
      inputRef.current.value += emoji;
    }
  };

  return (
    <div className="w-full h-24 flex justify-between gap-7 bg-mainBlue p-8 relative">
      {error && (
        <p className="absolute top-2 left-8 text-red-600 text-sm">
          Max length message 500
        </p>
      )}
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Write a message..."
        className="bg-transparent placeholder:text-white text-white text-xl font-semibold focus:outline-none flex-1"
      />
      <div className="flex gap-x-3 items-center">
        <EmojiPickerCustom
          isOpen={emojiIsOpen}
          onClose={closeEmoji}
          addEmoji={handleAddEmoji}
        />
        <FaSmile
          onClick={openEmoji}
          className={clsx('fill-white w-7 h-7 cursor-pointer', {
            'fill-mainBlue': emojiIsOpen,
          })}
        />
        <FaPaperPlane
          className="fill-white w-7 h-7 cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default InputChat;

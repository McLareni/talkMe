import React, { useRef } from 'react';
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

  const handleSend = () => {
    sendMessageFn(inputRef.current?.value || '');
    if (inputRef.current) {
      inputRef.current.value = '';
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
    <div className="w-full h-24 flex justify-between bg-fiolet p-8">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Write a message..."
        className="bg-transparent placeholder:text-white text-white text-xl font-semibold focus:outline-none"
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

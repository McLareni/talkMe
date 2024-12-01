import React, { useRef } from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';

interface IProps {
  sendMessageFn: (message: string) => void;
}

const InputChat: React.FC<IProps> = ({ sendMessageFn }) => {
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

  return (
    <div className="w-full h-24 flex justify-between bg-fiolet absolute bottom-0 p-8">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Write a message..."
        className="bg-transparent placeholder:text-white text-white text-xl font-semibold focus:outline-none"
      />
      <div className="flex gap-x-3 items-center">
        <FaSmile className="fill-white w-7 h-7 cursor-pointer" />
        <FaPaperPlane
          className="fill-white w-7 h-7 cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default InputChat;

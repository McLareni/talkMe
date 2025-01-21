import React from 'react';

import EmojiPicker from 'emoji-picker-react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addEmoji: ({ emoji }: { emoji: any }) => void;
}

const EmojiPickerCustom: React.FC<IProps> = ({ isOpen, onClose, addEmoji }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
      <dialog open={isOpen} className='absolute z-50'>
        <EmojiPicker
          onEmojiClick={addEmoji}
          open
          lazyLoadEmojis
          style={{ position: 'absolute', bottom: 40, right: -450, zIndex: 99 }}
        />
      </dialog>
    </>
  );
};

export default EmojiPickerCustom;

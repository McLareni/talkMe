import React from 'react';
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  deleteChat: () => void;
}

const PopUp: React.FC<IProps> = ({ isOpen, onClose, deleteChat }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div> // Backdrop layer
      )}
      <dialog
        open={isOpen}
        className="absolute z-50 text-white text-base font-semibold bg-mainBlue rounded-2xl p-3 w-52 right-4 top-20 mr-0"
        aria-label="Popup menu"
      >
        <div>
          <h1 className="flex items-center mb-2 cursor-pointer">
            <FaUserCircle className="w-6 h-6 mr-2" />
            Open profile
          </h1>
          <h1 className="flex items-center cursor-pointer" onClick={deleteChat}>
            <FaTrashAlt className="w-6 h-6 mr-2" />
            Delete chat
          </h1>
        </div>
      </dialog>
    </>
  );
};

export default PopUp;

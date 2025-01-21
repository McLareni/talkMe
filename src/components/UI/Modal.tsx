import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (onClose) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpenModal(false);
          // Slow close modal
          setTimeout(() => {
            onClose();
          }, 100);
        }
      };
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const modalRoot = document.getElementById('modal');
  if ((!isOpen && !isOpenModal) || !modalRoot) {
    console.log('close');

    return null;
  }

  return createPortal(
    <div
      className={clsx(`fixed inset-0 z-50 flex items-center justify-center`)}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className={clsx(
          `fixed inset-0 bg-slate-500 bg-opacity-50 transition-all duration-300 ease-in-out`,
          {
            'backdrop-blur-md': isOpenModal,
            'backdrop-none': isOpenModal,
          }
        )}
        onClick={onClose}
      ></div>

      <div
        className={clsx(
          `relative z-10 rounded-[20px] shadow-lg bg-white transition-all`,
          { 'scale-100': isOpenModal, 'scale-75': !isOpenModal }
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

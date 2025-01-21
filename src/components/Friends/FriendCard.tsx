import React, { useRef, useState } from 'react';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import { selectUserId } from '../../store/auth/authSelectors';
import {
  friendApi,
  useConfirmRequestMutation,
  useDeleteFriendMutation,
  useRejectRequestMutation,
} from '../../store/friends/operations';
import { checkStatusChat, createChat } from '../../utils/request';
import Modal from '../UI/Modal';
import userPlaceholder from '/user-placeholder.png';

interface IProps {
  user: IFriend;
  idChat?: string;
  isRequest?: number;
}

const FriendCard: React.FC<IProps> = ({ user, idChat, isRequest }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputModalIsOpen, setInputModalIsOpen] = useState(false);
  const [deleteFriendModalIsOpen, setDeleteFriendModalIsOpen] = useState(false);
  const [confirmRequest, { data: statusConfirmRequest }] =
    useConfirmRequestMutation();
  const [rejectRequest, { data: statusRejectRequest }] =
    useRejectRequestMutation();
  const [deleteFriend, { data: statusDeleteFriend }] =
    useDeleteFriendMutation();
  const userId = useAppSelector(selectUserId);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate();

  const handleCreateChat = async () => {
    const chat = await createChat(user.id, inputRef.current?.value);
    navigation(`/chats/${chat.id}`);
  };

  const handleOpenUserProfile = (e: HTMLElement) => {
    console.log(e);

    if (e.tagName === 'DIV' || e.tagName === 'IMG') {
      navigation(`/user/${user.id}`);
    }
  };

  const handleConfirmRequest = async () => {
    await confirmRequest({ friendId: user.id, userId });
    friendApi.endpoints.getMyRequest.initiate();
  };

  const handleRejectRequest = async () => {
    await rejectRequest({ friendId: user.id, userId });
    friendApi.endpoints.getMyRequest.initiate();
  };

  const handleDeleteFriend = async () => {
    await deleteFriend(user.id);
  };

  const handleOpenChat = async () => {
    const status = await checkStatusChat(userId, user.id);
    if (status) {
      navigation(`/chats/${status}`);
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <div
      className="w-56 p-4 bg-mainBlue rounded-[20px] text-center"
      onClick={e => handleOpenUserProfile(e.target as HTMLElement)}
    >
      <img
        src={user.picture || userPlaceholder}
        className="rounded-[15px] w-full"
        width="192"
        height="192"
      />
      <h2 className="text-customWhite font-semibold">{user.name}</h2>
      <div className="w-full text-center text-white font-semibold flex flex-col items-center gap-2">
        {isRequest ? (
          <>
            <button
              onClick={handleConfirmRequest}
              className="w-3/4 rounded-[5px] bg-ligthBlue flex gap-3 items-center justify-center p-1"
            >
              Сonfirm
            </button>
            <button
              onClick={handleRejectRequest}
              className="w-3/4 rounded-[5px] bg-ligthBlue flex gap-3 items-center justify-center p-1"
            >
              Reject
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleOpenChat}
              className="w-3/4 rounded-[5px] bg-ligthBlue flex gap-3 items-center justify-center p-1"
            >
              Message <FaPaperPlane className="w-4 h-4 fill-white" />
            </button>
            <button
              onClick={() => setDeleteFriendModalIsOpen(true)}
              className="w-3/4 rounded-[5px] bg-ligthBlue flex gap-3 items-center justify-center p-1"
            >
              Remove <FaTrash className="w-4 h-4 fill-white" />
            </button>
          </>
        )}
      </div>

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className="px-8  py-5 text-center">
            <h2 className="text-xl">You don't have a chat with this user.</h2>
            <p className="text-xl mt-2">Create a chat?</p>
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-20 h-8 border border-mainBlue text-mainBlue"
                onClick={() => setModalIsOpen(false)}
              >
                No
              </button>
              <button
                className="rounded-xl text-center w-20 h-8 bg-mainBlue text-white"
                onClick={() => setInputModalIsOpen(true)}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {inputModalIsOpen && (
        <Modal
          isOpen={inputModalIsOpen}
          onClose={() => setInputModalIsOpen(false)}
        >
          <div className="px-8  py-5 text-center">
            <h2 className="text-xl">Enter chat name</h2>
            <input
              ref={inputRef}
              type="text"
              className="border border-mainBlue mt-3"
            />
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-20 h-8 border border-mainBlue text-mainBlue"
                onClick={() => setInputModalIsOpen(false)}
              >
                Back
              </button>
              <button
                className="rounded-xl text-center w-20 h-8 bg-mainBlue text-white"
                onClick={handleCreateChat}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteFriendModalIsOpen && (
        <Modal
          isOpen={deleteFriendModalIsOpen}
          onClose={() => {
            setDeleteFriendModalIsOpen(false);
          }}
        >
          <div className="px-8  py-5 text-center">
            <h2 className="text-xl">Do you really want to delete a friend? </h2>
            <p className="text-md text-gray-600">
              The chat and all messages with this friend will be deleted too
            </p>
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-20 h-8 border border-mainBlue text-mainBlue"
                onClick={() => setDeleteFriendModalIsOpen(false)}
              >
                No
              </button>
              <button
                className="rounded-xl text-center w-20 h-8 bg-mainBlue text-white"
                onClick={handleDeleteFriend}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FriendCard;

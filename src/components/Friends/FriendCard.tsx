import React, { useRef, useState } from 'react';
import { FaCheck, FaPaperPlane, FaTrash, FaUserMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
import ProfileImage from '../UI/ProfileImage';

interface IProps {
  user: IFriend;
  idChat?: string;
  isRequest?: number;
}

const FriendCard: React.FC<IProps> = ({ user, isRequest }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputModalIsOpen, setInputModalIsOpen] = useState(false);
  const [deleteFriendModalIsOpen, setDeleteFriendModalIsOpen] = useState(false);
  const [confirmRequest] = useConfirmRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();
  const [deleteFriend] = useDeleteFriendMutation();
  const userId = useAppSelector(selectUserId);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate();

  const handleCreateChat = async () => {
    const chat = await createChat(user.id, inputRef.current?.value);
    navigation(`/chats/${chat.id}`);
  };

  const handleOpenUserProfile = (e: HTMLElement) => {

    if (e.tagName === 'DIV' || e.tagName==='H2') {
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
    <>
      <div
        className="w-56 p-4 bg-ligthBlue rounded-[20px] text-center card"
        onClick={e => handleOpenUserProfile(e.target as HTMLElement)}
      >
        <div className="rounded-[15px] w-full aspect-square overflow-hidden text-[80px]">
          <ProfileImage letter={user.name[0]} />
        </div>
        {/* <img
        src={user.picture || userPlaceholder}
        className="rounded-[15px] w-full"
        width="192"
        height="192"
      /> */}
        <h2 className="text-customWhite font-semibold my-2">{user.name}</h2>
        <div className="w-full text-center text-white font-semibold flex flex-col items-center gap-2">
          {isRequest ? (
            <>
              <button
                onClick={handleConfirmRequest}
                className="w-32 rounded-[5px] bg-mainBlue flex gap-3 items-center justify-center p-1 hover:bg-fiolet"
              >
                Accept
                <FaCheck className="w-4 h-4" />
              </button>
              <button
                onClick={handleRejectRequest}
                className="w-32 rounded-[5px] bg-mainBlue flex gap-3 items-center justify-center p-1 hover:bg-fiolet"
              >
                Reject
                <FaUserMinus className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleOpenChat}
                className="w-3/4 rounded-[5px] bg-mainBlue flex gap-3 items-center justify-center p-1 hover:bg-fiolet"
              >
                Message <FaPaperPlane className="w-4 h-4 fill-white" />
              </button>
              <button
                onClick={() => setDeleteFriendModalIsOpen(true)}
                className="w-3/4 rounded-[5px] bg-mainBlue flex gap-3 items-center justify-center p-1 hover:bg-fiolet"
              >
                Remove <FaTrash className="w-4 h-4 fill-white" />
              </button>
            </>
          )}
        </div>
      </div>

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className="px-8 py-5 text-center w-96">
            <h2 className="text-xl text-mainBlue font-semibold w-60 text-center mx-auto">
              You don't have a chat with this user yet. Want to create a chat?
            </h2>
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-32 h-8 bg-mainBlue text-white"
                onClick={() => setModalIsOpen(false)}
              >
                No
              </button>
              <button
                className="rounded-xl text-center w-32 h-8 text-white bg-fiolet"
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
          <div className="px-8 py-5 text-center">
            <h2 className="text-xl text-mainBlue font-semibold">
              Enter chat name
            </h2>
            <input
              ref={inputRef}
              type="text"
              className="border border-mainBlue mt-3"
            />
            <div className="w-full flex  gap-3 justify-around mt-5">
              <button
                className="rounded-xl text-center w-32 h-8 bg-mainBlue text-white"
                onClick={() => setInputModalIsOpen(false)}
              >
                Back
              </button>
              <button
                className="rounded-xl text-center w-32 h-8 bg-fiolet text-white"
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
            <h2 className="text-xl text-mainBlue font-semibold">Do you really want to delete a friend? </h2>
            <p className="text-md text-mainBlue">
              The chat and all messages with this friend will be deleted too
            </p>
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-32 h-8 bg-mainBlue text-white"
                onClick={() => setDeleteFriendModalIsOpen(false)}
              >
                No
              </button>
              <button
                className="rounded-xl text-center w-32 h-8 bg-fiolet text-white"
                onClick={handleDeleteFriend}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FriendCard;

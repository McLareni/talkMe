import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import clsx from 'clsx';

import { Modal } from '../components/UI/Modal';
import ProfileImage from '../components/UI/ProfileImage';
import { useAppSelector } from '../hooks/hooks';
import { selectUserId } from '../store/auth/authSelectors';
import {
  useConfirmRequestMutation,
  useDeleteFriendMutation,
  useRejectRequestMutation,
} from '../store/friends/operations';
import { useGetUserQuery } from '../store/user/operations';
import { checkStatusChat, createChat } from '../utils/request';
import { createFriendRequest } from '../utils/request';

type ExtendedFriend = IFriend & { idChat?: number; request: any };

const UserProfile = () => {
  const { idUser } = useParams();
  const myUserId = useAppSelector(selectUserId);
  const { data, refetch } = useGetUserQuery({ idUser: `${idUser}` });
  const [user, setUser] = useState<ExtendedFriend>();
  const [request, setRequest] = useState(user?.request);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputModalIsOpen, setInputModalIsOpen] = useState(false);
  const [deleteFriendModalIsOpen, setDeleteFriendModalIsOpen] = useState(false);
  const navigation = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirmRequest] = useConfirmRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();
  const [deleteFriend] = useDeleteFriendMutation();

  const handleConfirmRequest = async () => {
    await confirmRequest({ friendId: Number(idUser), userId: myUserId });
    refetch();
  };

  const handleRejectRequest = async () => {
    await rejectRequest({ friendId: Number(idUser), userId: myUserId });
    refetch();
  };

  useEffect(() => {
    setUser(data);
    setRequest(data?.request);
  }, [data]);

  const handleSendFriendRequest = async () => {
    const response = await createFriendRequest(myUserId, `${idUser}`);

    if (response) {
      setRequest(response);
    }
  };

  const handleCreateChat = async () => {
    const chat = await createChat(Number(idUser), inputRef.current?.value);
    navigation(`/chats/${chat.id}`);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleOpenChat = async () => {
    const status = await checkStatusChat(myUserId, Number(idUser));
    if (status) {
      navigation(`/chats/${status}`);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleDeleteFriend = async () => {
    await deleteFriend(user.id);

    navigation('/friends');
  };

  return (
    <>
      <main className="">
        <header className="h-16">
          <h2 className="text-[20px] font-black leading-[64px] text-mainBlue ml-4">
            User profile
          </h2>
        </header>
        <main className="m-10 p-4 rounded-2xl border-2 border-mainBlue">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden text-[24px]">
              <ProfileImage letter={user.name[0]} />
            </div>
            <div className="text-mainBlue ml-4">
              <h3 className="font-semibold text-xl">{user.name}</h3>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          {/* <img
        src={user.picture || userPlaceholder}
        alt={user.name}
        className="w-10 h-10 object-cover"
      /> */}

          {user.status === 'friend' ? (
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleOpenChat}
                className="w-32 rounded-[5px] bg-fiolet mx-auto flex gap-3 items-center justify-center p-1 text-white"
              >
                Message <FaPaperPlane className="w-4 h-4 fill-white" />
              </button>
              <button
                onClick={() => setDeleteFriendModalIsOpen(true)}
                className="w-32 rounded-[5px] bg-mainBlue  flex gap-3 items-center justify-center p-1 text-white"
              >
                Remove <FaTrash className="w-4 h-4 fill-white" />
              </button>
            </div>
          ) : request?.toIdUser === myUserId ? (
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={handleRejectRequest}
                className="w-32 rounded-[5px] bg-mainBlue text-white flex gap-3 items-center justify-center p-1"
              >
                Reject
              </button>
              <button
                onClick={handleConfirmRequest}
                className="w-32 rounded-[5px] bg-fiolet text-white flex gap-3 items-center justify-center p-1"
              >
                Сonfirm
              </button>
            </div>
          ) : (
            <button
              className={clsx(
                'w-32 rounded-[5px] text-white flex items-center justify-center mx-auto mt-4 p-1',
                request?.fromIdUser === myUserId ? 'bg-fiolet' : 'bg-mainBlue'
              )}
              onClick={handleSendFriendRequest}
              disabled={request?.fromIdUser === myUserId}
            >
              {request?.fromIdUser === myUserId
                ? 'Request sented'
                : 'Send request'}
            </button>
          )}
        </main>
      </main>

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
                className="rounded-xl text-center w-32 h-8 bg-fiolet text-white"
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
              className="border border-mainBlue mt-3 p-1 text-lg font-medium text-mainBlue focus:outline-none"
            />
            <div className="w-full flex gap-3 justify-around mt-5">
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
            <h2 className="text-xl text-mainBlue font-semibold">
              Do you really want to delete a friend?{' '}
            </h2>
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

export default UserProfile;

import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import userPlaceholder from '../../public/user-placeholder.png';
import { Modal } from '../components/UI/Modal';
import { useAppSelector } from '../hooks/hooks';
import { selectUserId } from '../store/auth/authSelectors';
import { useGetUserChatsQuery } from '../store/chats/operations';
import {
  friendApi,
  useConfirmRequestMutation,
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
  const navigation = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirmRequest, { data: statusConfirmRequest }] =
    useConfirmRequestMutation();
  const [rejectRequest, { data: statusRejectRequest }] =
    useRejectRequestMutation();

  const handleConfirmRequest = async () => {
    await confirmRequest({ friendId: Number(idUser), userId: myUserId });
    refetch();
  };

  const handleRejectRequest = async () => {
    await rejectRequest({ friendId: Number(idUser), userId: myUserId });
    refetch();
  };

  const { data: chats } = useGetUserChatsQuery();

  const idChat = chats?.find(chat => chat.users.id === idUser);

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

  const handleShowModal = () => {
    setModalIsOpen(true);
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

  return (
    <main>
      <h2>User Profile</h2>
      <img
        src={user.picture || userPlaceholder}
        alt={user.name}
        className="w-10 h-10 object-cover"
      />
      <h3>Name: {user.name}</h3>
      <p>Email: {user.email}</p>
      {user.status === 'friend' ? (
        <button
          onClick={handleOpenChat}
          className="w-3/4 rounded-[5px] bg-ligthBlue my-2 flex gap-3 items-center justify-center p-1"
        >
          Message <FaPaperPlane className="w-4 h-4 fill-white" />
        </button>
      ) : request?.toIdUser === myUserId ? (
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
        <button onClick={handleSendFriendRequest}>
          {request?.fromIdUser === myUserId ? 'Request sented' : 'Send request'}
        </button>
      )}

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
    </main>
  );
};

export default UserProfile;

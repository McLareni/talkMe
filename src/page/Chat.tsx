import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import userPlaceholder from '../../public/user-placeholder.png';
import HeaderChat from '../components/Chats/HeaderChat';
import InputChat from '../components/Chats/InputChat';
import ListMessage from '../components/Chats/ListMessage';
import PopUp from '../components/Chats/PopUp';
import { socket } from '../components/Layouts/Layouts';
import Modal from '../components/UI/Modal';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectUserId } from '../store/auth/authSelectors';
import {
  chatApi,
  useGetChatUsersQuery,
  useSendMessageMutation,
} from '../store/chats/operations';
import { deleteChat } from '../utils/request';

const Chat = () => {
  const { idChat } = useParams();
  const [emojiIsOpen, setEmojiIsOpen] = useState<boolean>(false);
  const [popUpIsOpen, setPopUpIsOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const { data: ChatUser } = useGetChatUsersQuery(idChat || '');
  const [sendMessage, {}] = useSendMessageMutation();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setMessages([]);
  }, [idChat]);

  const idUser = useAppSelector(selectUserId);

  const handleSendMessage = async (message: string) => {
    if (message) {
      const nowTime = new Date().toISOString();

      const tempMessage = {
        message,
        idChat,
        idUser,
        sentTime: nowTime,
        isSented: 'NOT',
      } as IMessage;

      setMessages(prev => [
        { ...tempMessage },
        ...prev.map(msg => ({ ...msg })),
      ]);

      setTimeout(async () => {
        const newMessage = await sendMessage({
          message,
          idChat: idChat || '',
          time: nowTime,
        });

        if (!newMessage?.data?.sentedMessage) {
          setMessages(prev => {
            const newMessageList = [
              ...prev.map(msg => ({ ...msg })),
            ] as IMessage[];
            const indexUnsentedMsg = newMessageList.findIndex(
              msg => msg.sentTime.toString() === nowTime
            );

            newMessageList[indexUnsentedMsg] = {
              ...tempMessage,
              isSented: 'ERROR',
            };

            return newMessageList;
          });
        } else {
          socket.emit('sendMessage', idChat, newMessage.data.sentedMessage);
        }
      }, 0);

      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReSendMessage = (time: string, text: string) => {
    setMessages(prev => {
      const newMessageList = [...prev.map(msg => ({ ...msg }))] as IMessage[];
      const indexUnsentedMsg = newMessageList.findIndex(
        msg => msg.sentTime.toString() === time
      );

      newMessageList.splice(indexUnsentedMsg, 1);

      return newMessageList;
    });

    handleSendMessage(text);
  };

  const changeMessageList = (newMessage: IMessage | IMessage[]) => {
    if (Array.isArray(newMessage)) {
      setMessages([...newMessage]);
    } else {
      setMessages(prev => {
        const newMessageList = [...prev.map(msg => ({ ...msg }))] as IMessage[];
        const indexUnsentedMsg = newMessageList.findIndex(
          msg => msg.sentTime.toString() === newMessage.sentTime.toString()
        );

        if (indexUnsentedMsg !== -1) {
          newMessageList[indexUnsentedMsg] = { ...newMessage };
          console.log(newMessageList);

          return newMessageList;
        } else {
          return [{ ...newMessage }, ...newMessageList];
        }
      });
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDeleteChat = async () => {
    const response = await deleteChat(idChat || '');

    if (response) {
      await dispatch(
        chatApi.endpoints.getUserChats.initiate(undefined, {
          forceRefetch: true,
        })
      );
      navigate('/chats/');
    }
  };

  return (
    <div
      id="window"
      className="w-full h-screen relative border-l-8 border-mainBlue"
    >
      <HeaderChat
        info={ChatUser && ChatUser[0]}
        openPopUp={() => setPopUpIsOpen(true)}
      />
      <PopUp
        isOpen={popUpIsOpen}
        onClose={() => setPopUpIsOpen(false)}
        deleteChat={() => setShowModal(true)}
        user={ChatUser && ChatUser[0].ChatUser}
      />
      <ListMessage
        key={idChat}
        messages={messages}
        messagesEndRef={messagesEndRef}
        saveMessages={changeMessageList}
        reSendMessage={handleReSendMessage}
        photoFriend={
          (ChatUser && ChatUser[0].ChatUser.picture) || userPlaceholder
        }
      />
      <InputChat
        sendMessageFn={message => handleSendMessage(message)}
        emojiIsOpen={emojiIsOpen}
        openEmoji={() => setEmojiIsOpen(prev => !prev)}
        closeEmoji={() => setEmojiIsOpen(false)}
      />
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="px-8 py-5 text-center">
            <h2 className="text-xl text-mainBlue font-semibold">
              Are you sure you want to delete the chat?
            </h2>
            <h2 className="text-base text-mainBlue font-semibold">
              The entire chat history will be deleted.
            </h2>
            <p className="text-xl mt-3 text-mainBlue font-semibold">Delete a chat?</p>
            <div className="w-full flex justify-around mt-5">
              <button
                className="rounded-xl text-center w-32 h-8 bg-mainBlue text-white"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="rounded-xl text-center w-32 h-8 bg-fiolet text-white"
                onClick={handleDeleteChat}
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

export default Chat;

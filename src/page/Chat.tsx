import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../App';
import HeaderChat from '../components/Chats/HeaderChat';
import InputChat from '../components/Chats/InputChat';
import Message from '../components/Chats/Message';
import PopUp from '../components/Chats/PopUp';
import { useAppSelector } from '../hooks/hooks';
import { selectUserId } from '../store/auth/authSelectors';
import {
  useGetChatUsersQuery,
  useGetUserChatQuery,
  useSendMessageMutation,
} from '../store/chats/operations';

const Chat = () => {
  const { idChat } = useParams();
  const { data, refetch } = useGetUserChatQuery(idChat || '');
  const { data: ChatUsers } = useGetChatUsersQuery(idChat || '');
  const idUser = useAppSelector(selectUserId);
  const [sendMessage] = useSendMessageMutation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(ChatUsers);

  const handleSendMessage = (message: string) => {
    if (message) {
      sendMessage({ message, idChat: idChat?.toString() || '' })
        .unwrap()
        .then(() => {
          socket.emit('sendMessage', idChat, message);
        })
        .catch(error => {
          console.error('Message sending failed:', error);
        });
    }
  };

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    socket.emit('joinChat', idChat);

    socket.on('message', () => {
      refetch();
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-full relative border-l-8 border-mainBlue">
      <HeaderChat info={ChatUsers} />
      <PopUp/>
      <ul className="overflow-y-scroll h-full py-28 p-5 flex flex-col gap-2 scrollbar-hide">
        {messages.map(message => (
          <li key={message.id}>
            <Message
              text={message.message || ''}
              isYourMessage={message.idUser === idUser}
            />
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <InputChat sendMessageFn={message => handleSendMessage(message)} />
    </div>
  );
};

export default Chat;

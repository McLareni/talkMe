import React, { LegacyRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

import clsx from 'clsx';

import Message from '../../components/Chats/Message';
import { useAppSelector } from '../../hooks/hooks';
import { selectUserId, selectUserPhoto } from '../../store/auth/authSelectors';
import { useLazyGetUserChatQuery } from '../../store/chats/operations';
import { groupMessagesByDay } from '../../utils/groupMessage';
import { socket } from '../Layouts/Layouts';

interface IProps {
  messages: IMessage[];
  messagesEndRef: LegacyRef<HTMLDivElement> | undefined;
  saveMessages: (messages: IMessage | IMessage[]) => void;
  reSendMessage: (time: string, text: string) => void;
  photoFriend: string;
}

const LIMIT = 20;

const ListMessage: React.FC<IProps> = ({
  messages,
  messagesEndRef,
  saveMessages,
  photoFriend,
  reSendMessage,
}) => {
  const { idChat } = useParams();
  const idUser = useAppSelector(selectUserId);
  const groupedMessages = groupMessagesByDay(messages);
  const { ref, inView } = useInView({ threshold: 0 });
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [getMessage] = useLazyGetUserChatQuery();
  const yourPicture = useAppSelector(selectUserPhoto);

  const [loadingMesssage, setLoadingMessage] = useState<boolean>(false);

  const fetchMessages = async () => {
    setLoadingMessage(true);
    const { data } = await getMessage({
      idChat: idChat || '',
      limit: LIMIT,
      offset,
    });

    if (data && Array.isArray(data)) {
      if (data.length) {
        saveMessages([...messages, ...data]);
        setOffset(prev => prev + LIMIT);
      } else {
        setHasMore(false);
      }
    } else {
      console.error('Invalid response data:', data);
    }
    setLoadingMessage(false);
  };

  useEffect(() => {
    console.log('view');

    if (inView && hasMore && offset !== 0) {
      fetchMessages();
    }
  }, [inView]);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoadingMessage(true);
      const response = await getMessage({
        idChat: idChat || '',
        limit: LIMIT,
        offset: 0,
      });

      if (response.data) {
        saveMessages(response.data as IMessage[]);
        setOffset(LIMIT);

        if (response.data.length < LIMIT) {
          setHasMore(false);
        }
      }
      setLoadingMessage(false);
    };

    fetchMessage();

    const handleMessage = (newMessage: IMessage) => {
      saveMessages(newMessage);
    };

    socket.emit('joinChat', idChat);

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  return (
    <ul className="overflow-y-scroll px-5 flex flex-col-reverse gap-2 scrollbar-hide h-[calc(100%-96px-96px)] relative">
      {(messages.length === 0 && !loadingMesssage) && (
        <p className="text-center mb-2">There are no messages in this chat yet</p>
      )}
      <div ref={messagesEndRef} id="messageEnd" />
      {Object.keys(groupedMessages).map(time => {
        return (
          <li key={time}>
            <h1
              className={clsx('text-center', time === 'Sending...' && 'hidden')}
            >
              {time}
            </h1>
            <ul
              className={clsx(
                'flex',
                time === 'No sented' ? 'flex-col' : 'flex-col-reverse'
              )}
            >
              {groupedMessages[time].map(message => (
                <li key={message.sentTime}>
                  <Message
                    sented={message.isSented}
                    text={message.message || ''}
                    time={message.sentTime}
                    friendPhoto={photoFriend}
                    isYourMessage={message.idUser === idUser}
                    yourPhoto={yourPicture}
                    reSend={reSendMessage}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
      <div ref={ref} id="Load msg"></div>

      {loadingMesssage && (
        <div className="flex justify-center p-4">
          <SyncLoader color="#6DA0F9" />
        </div>
      )}
    </ul>
  );
};

export default ListMessage;

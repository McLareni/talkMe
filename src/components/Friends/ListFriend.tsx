import React, { useEffect, useState } from 'react';

import { useGetUserChatsQuery } from '../../store/chats/operations';
import FriendCard from './FriendCard';

interface IProps {
  friends?: { getFriend: IFriend }[];
}

const ListFriend: React.FC<IProps> = ({ friends }) => {
  const { data } = useGetUserChatsQuery();
  const [chats, setChats] = useState<any[] | undefined>(data);

  useEffect(() => {
    setChats(data);
    console.log(data);
  }, [data]);

  return (
    <ul className="flex gap-16 flex-wrap p-10">
      {friends?.map(({ getFriend }) => {
        const chat = chats?.find(chat => chat.users.id === getFriend.id);

        return (
          <li key={getFriend.id}>
            <FriendCard user={getFriend} idChat={chat?.idChat} />
          </li>
        );
      })}
    </ul>
  );
};

export default ListFriend;

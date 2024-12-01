import { useGetUserChatsQuery } from '../../store/chats/operations';
import ListItemChat from './ListItemChat';

const ListChat = () => {
  const { data } = useGetUserChatsQuery();
  console.log(data);

  return (
    <ul className='mx-6'>
      {data?.map(chat => (
        <li key={chat.idChat}>
          <ListItemChat
            chat={{ idChat: chat.idChat, chatName: chat.chatName }}
            users={chat.users}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListChat;

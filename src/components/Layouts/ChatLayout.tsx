import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useGetUserChatsQuery } from '../../store/chats/operations';
import ListChat from '../Chats/ListChats';
import InputFilter from '../UI/InputFilter';

const ChatLayout = () => {
  const { data, refetch } = useGetUserChatsQuery();
  const [spinner, setSpinner] = useState(true);
  const [filter, setFilter] = useState('');

  const filteredData = data?.filter(chat => {
    const isUser = filter[0] === '@';

    return isUser
      ? chat.users.name.includes(filter.slice(1, filter.length))
      : chat.chatName.includes(filter);
  });

  useEffect(() => {
    refetch().then(() => setTimeout(() => setSpinner(false), 100));
  }, [data]);

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (spinner) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <aside className="w-1/3 min-w-[300px] pt-5 flex flex-col items-center">
        <InputFilter
          filter={filter}
          changeFilter={handleChangeFilter}
          color="mainBlue"
        />
        <ListChat chats={filteredData} />
      </aside>
      <Outlet />
    </>
  );
};

export default ChatLayout;

import { useEffect, useState } from 'react';

import ListFriend from '../components/Friends/ListFriend';
import InputFilter from '../components/UI/InputFilter';
import { useGetFriendsQuery } from '../store/friends/operations';

const MyFriend = () => {
  const [filter, setFilter] = useState<string>('');
  const { data, refetch } = useGetFriendsQuery();
  const [friends, setFriends] = useState<{ getFriend: IFriend }[]>();

  useEffect(() => {
    refetch().then(() => setFriends(data));
  }, [data]);

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredFriend = friends?.filter(chat => {
    const isEmail = filter[0] === '@';

    return isEmail
      ? chat.getFriend.email.includes(filter.slice(1, filter.length))
      : chat.getFriend.name.includes(filter);
  });
  return (
    <main className="p-4">
      <div className="flex gap-6">
        <h2 className="font-black text-xl text-fiolet">
          Friends: {friends?.length || 0}
        </h2>
        <InputFilter
          filter={filter}
          changeFilter={handleChangeFilter}
          width="72"
          color="fiolet"
        />
      </div>
      <ListFriend friends={filteredFriend} />
    </main>
  );
};

export default MyFriend;

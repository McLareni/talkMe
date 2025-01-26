import { useEffect } from 'react';

import FriendCard from '../components/Friends/FriendCard';
import { useGetMyRequestQuery } from '../store/friends/operations';

const MyRequest = () => {
  const { data: requests, refetch } = useGetMyRequestQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <main className="p-4">
      <div className="flex gap-6">
        <h2 className="font-black text-xl text-mainBlue">
          Requests: {requests?.length || 0}
        </h2>
      </div>
      <ul className="flex gap-16 flex-wrap p-10">
        {requests?.map((request: { id: number; myFriendRequest: IFriend }) => {
          return (
            <li key={request.id}>
              <FriendCard
                user={request.myFriendRequest}
                isRequest={request.id}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MyRequest;

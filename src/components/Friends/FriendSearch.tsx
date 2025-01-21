import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from 'use-debounce';

import userPlaceholder from '../../../public/user-placeholder.png';
import { useAppSelector } from '../../hooks/hooks';
import { selectUserId } from '../../store/auth/authSelectors';
import { useGetNewFriendsQuery } from '../../store/friends/operations';
import InputFilter from '../UI/InputFilter';

const FriendSearch = () => {
  const userID = useAppSelector(selectUserId);
  const [filter, setFilter] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const [debounceFilter] = useDebounce(filter, 500);
  const { data } = useGetNewFriendsQuery({ filter: debounceFilter, userID });

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="relative">
      <InputFilter
        filter={filter}
        changeFilter={handleChangeFilter}
        onBlur={() => setTimeout(() => setOpenPopUp(false), 100)}
        onFocus={() => setOpenPopUp(true)}
        width="full"
      />
      {data && openPopUp && (
        <ul className="absolute top-full mt-2 p-1 bg-mainBlue w-full rounded-[10px] flex flex-col gap-1">
          {data.length === 0 && (
            <li className="text-gray-600 text-sm">
              No users with this name were found
            </li>
          )}
          {data.map(user => (
            <li key={user.id} className="">
              <Link
                to={`/user/${user.id}`}
                className="flex items-center hover:cursor-pointer z-20"
              >
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={user.picture || userPlaceholder}
                  />
                </div>

                <div className="ml-2">
                  <h2 className="text-white text-[15px] font-semibold">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-xs -mt-1">{user.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendSearch;

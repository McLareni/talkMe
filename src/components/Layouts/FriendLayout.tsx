import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import FriendSearch from '../Friends/FriendSearch';

const FriendLayout = () => {
  return (
    <div className="w-full">
      <header className="bg-fiolet h-16 flex items-center pl-16">
        <ul className="flex gap-6">
          <li>
            <Link
              to={'/friends'}
              className="text-white text-xl font-bold rounded-3xl bg-mainBlue w-60 text-center inline-block"
            >
              My friends
            </Link>
          </li>
          <li>
            <Link
              to={'requests'}
              className="text-white text-xl font-bold rounded-3xl bg-mainBlue w-60 text-center inline-block"
            >
              Requests
            </Link>
          </li>
          <li>
            <FriendSearch />
          </li>
        </ul>
      </header>
      <Outlet />
    </div>
  );
};

export default FriendLayout;

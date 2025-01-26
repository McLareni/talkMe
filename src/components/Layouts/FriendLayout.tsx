import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import FriendSearch from '../Friends/FriendSearch';

const FriendLayout = () => {
  return (
    <div className="w-full">
      <header className="h-16 flex items-center pl-16">
        <ul className="flex gap-6">
          <li>
            <NavLink
              end
              to={'/friends'}
              className={({ isActive }) =>
                clsx(
                  'text-white text-xl font-bold rounded-3xl w-60 h-8 text-center inline-block',
                  isActive ? 'bg-fiolet' : 'bg-mainBlue'
                )
              }
            >
              My friends
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'requests'}
              className={({ isActive }) =>
                clsx(
                  'text-white text-xl font-bold rounded-3xl w-60 h-8 text-center inline-block',
                  isActive ? 'bg-fiolet' : 'bg-mainBlue'
                )
              }
            >
              Requests
            </NavLink>
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

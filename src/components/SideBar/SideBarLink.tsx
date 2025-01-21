import React from 'react';
import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

interface IProps {
  text: string;
  to: string;
}

const SideBarLink: React.FC<IProps> = ({ text, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            "text-xl text-white font-semibold relative w-fit after:content-[''] after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0",
            { 'after:w-[120%]': isActive }
          )
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default SideBarLink;

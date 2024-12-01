import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hooks';
import { logOut } from '../../store/auth/authSlice';
import SideBarLink from './SideBarLink';

const SideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="w-72 h-full bg-mainBlue relative overflow-hidden">
      <div className="w-full h-16 bg-[#BCD5FF]"></div>
      <nav className=" ml-5 mt-14">
        <ul className="flex flex-col gap-3">
          <SideBarLink text="Profile" to="/profile" />
          <SideBarLink text="Chats" to="/chats" />
          <SideBarLink text="Friends" to="/friends" />
          <button
            className="text-xl text-white font-semibold relative w-fit"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </ul>
      </nav>
      <div className="absolute bottom-72 -left-14">
        <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[300px] border-b-[#BCD5FF] absolute z-10"></div>
        <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[300px] border-b-[#C6DBFF] absolute -bottom-96 left-24 z-20"></div>
      </div>
    </div>
  );
};

export default SideBar;

import { Outlet } from 'react-router-dom';

import SideBar from '../SideBar/SideBar';

const Layout = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <main className="flex w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

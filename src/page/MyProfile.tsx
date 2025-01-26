import ProfileImage from '../components/UI/ProfileImage';
import { useAppSelector } from '../hooks/hooks';
import { selectUser } from '../store/auth/authSelectors';

const MyProfile = () => {
  const { user } = useAppSelector(selectUser);

  return (
    <main className="">
      <header className="h-16">
        <h2 className="text-[20px] font-black leading-[64px] text-mainBlue ml-4">
          My profile
        </h2>
      </header>
      <main className="m-10 p-4 rounded-2xl border-2 border-mainBlue">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden text-[24px]">
            <ProfileImage letter={user?.name[0] || ''} />
          </div>
          <div className="text-mainBlue ml-4">
            <h3 className="font-semibold text-xl">{user?.name}</h3>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>

        {/* <img
        src={user.picture || userPlaceholder}
        alt={user.name}
        className="w-10 h-10 object-cover"
      /> */}
      </main>
    </main>
  );
};

export default MyProfile;

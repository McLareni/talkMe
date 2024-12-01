import { FaTrashAlt, FaUserCircle } from 'react-icons/fa';

const PopUp = () => {
  return (
    <div className='absolute right-4 top-24 text-white text-base bg-mainBlue rounded-2xl p-3 w-52'>
      <h1 className='flex'>
        <span className='mr-2'>
          <FaUserCircle className='w-6 h-6'/>
        </span>
        Open profile
      </h1>
      <h1 className='flex'>
        <span className='mr-2'>
          <FaTrashAlt className='w-6 h-6'/>
        </span>
        Delete chat
      </h1>
    </div>
  );
};

export default PopUp;

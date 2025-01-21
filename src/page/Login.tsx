import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { useAppDispatch } from '../hooks/hooks';
import { ILoginArgs, authUser } from '../store/auth/authOperation';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center bg-loginGradient">
      <GoogleLogin
        onSuccess={async credentialResponse => {
          const userData = jwtDecode(credentialResponse.credential || '');

          await dispatch(authUser(userData as ILoginArgs));

          navigate('/profile');
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};
export default LoginPage;

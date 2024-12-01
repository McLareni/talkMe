import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { useAppDispatch } from '../hooks/hooks';
import { ILoginArgs, authUser } from '../store/auth/authOperation';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={async credentialResponse => {
        const userData = jwtDecode(
          credentialResponse.credential || ''
        );
        console.log(userData);
        
        await dispatch(authUser(userData as ILoginArgs));
        navigate('/profile');
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
export default LoginPage;

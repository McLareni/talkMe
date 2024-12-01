import { Navigate } from 'react-router-dom';

import Layout from '../../components/Layouts/Layouts';
import { useAppSelector } from '../../hooks/hooks';
import { selectIsUser } from '../../store/auth/authSelectors';

const LoginRouter = () => {
  const isUser = useAppSelector(selectIsUser);

  return isUser ? <Layout /> : <Navigate to="/login" />;
};

export default LoginRouter;

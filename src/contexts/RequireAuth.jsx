import { useContext } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const RequireAuth = () => {
  const { token } = useContext(AuthContext);


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>
};

export default RequireAuth;

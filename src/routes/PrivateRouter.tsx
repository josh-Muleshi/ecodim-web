import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/userAuth';
import Loading from '../components/Loading'
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();

    if (!auth) {
      return <Loading />;
    }
  
    const { currentUser } = auth;
    if (!currentUser) {
        return <Navigate to="/" replace />;
      }

  return children;
};

export default PrivateRoute;
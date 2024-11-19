import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
export const Logout = () => {

  
  const { loggedOutUser } = useAuth();
  useEffect(() => {
    loggedOutUser();
    
  }, [loggedOutUser]);

  return <Navigate to="/login" />;
};

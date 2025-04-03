import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../stores/Auth";


const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  
  return (
    <div>
        
      <Navigate to='/admin' />
    </div>
  );
};

export default Logout;

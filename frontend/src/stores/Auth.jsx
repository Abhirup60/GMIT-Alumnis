import { createContext, useContext, useState } from "react";

// context creation
export const AuthContext = createContext();

// provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [adminUser, setAdminUser] = useState([]);
  const [alumniStudent, setAlumniStudent] = useState([]);
  const [formDatas, setFormDatas] = useState(null);

  //   const authToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedin = !!token;
  console.log("isLoggedin: ", isLoggedin); //for debugging (ans will be true or false)

  // tackling logout functionalities
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // to get all the admin details
  const getAlltheAdminUser = async()=>{
    try {
      const response = await fetch("https://gmit-alumnis-backend.onrender.com/api/auth/admin/users",{
        method:"GET",
      })
      // console.log(response);
      if(response.ok){
        const res_data = await response.json();
        console.log(res_data.msg);
        setAdminUser(res_data.msg);
      }
    } catch (error) {
      console.log("error from fetching all the admin user", error);
    }
  }


  // to get all the alumni(student) details
  const getAlltheAlumni = async()=>{
    try {
      const response = await fetch("https://gmit-alumnis-backend.onrender.com/auth/alumni-users",{
        method:"GET",
      })
      console.log("from alumni student:",response);
      if(response.ok){
        const res_data = await response.json();
        console.log("data of alumni student: ",res_data.msg);
        setAlumniStudent(res_data.msg);
      }
    } catch (error) {
      console.log("error from fetching all the admin user", error);
    }
  }


  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        storeTokenInLS,
        LogoutUser,
        getAlltheAdminUser,
        adminUser,
        getAlltheAlumni,
        alumniStudent,
        formDatas,
        setFormDatas,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// consumer
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};

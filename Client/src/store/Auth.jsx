/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [userInfoData, setUserInfoData] = useState("");
  const [servicesData, setServicesData] = useState([]);
  
  const authTokenBearer = `Bearer ${token}`;
  // ----------------------------------------------------------------store token in LocalStorage for Login Function
  const store_in_LocalStorage = (tokens) => {
    setToken(tokens);
    return localStorage.setItem("token", tokens);
  };
  let isLoggedIn = !!token;
  
  // ------------------------------------------------------------------------------------------Logout Function
  const loggedOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  
  // ---------------------------------[to get current user data]------------------------------JWT Authentication
  
 
const user_auth = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      headers: {
        Authorization: authTokenBearer,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    const resData = await response.json();
    setUserInfoData(resData.userData);
    console.log(resData.userData);
  } catch (error) {
    console.error("Fetch error:", error.message);
  } finally {
    setIsLoading(false); // Set loading to false after data load or error
  }
};
  // ------------------------------------------------[to get Service Data]---------------------------
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log("Services:", resData.services_res);
        setServicesData(resData.services_res);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const user_tbl_heading = [
    { id: "1", text: "No." },
    { id: "2", text: "Name." },
    { id: "3", text: "Email." },
    { id: "4", text: "Phone." },
    { id: "5", text: "Admin." },
    { id: "6", text: "Delete" },
    { id: "7", text: "Edit" },
  ];
  useEffect(() => {
    user_auth();
    fetchServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user_tbl_heading,
        store_in_LocalStorage,
        loggedOutUser,
        isLoggedIn,
        userInfoData,
        servicesData,
        authTokenBearer,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

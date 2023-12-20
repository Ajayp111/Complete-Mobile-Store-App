import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Creating a context for authentication
const AuthContext = createContext();
// Creating an authentication provider component
const AuthProvider = ({ children }) => {
  // Setting up state to manage authentication data
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Setting the default axios authorization header using the token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // Fetching authentication data from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  // Providing authentication state and setter through context to child components
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

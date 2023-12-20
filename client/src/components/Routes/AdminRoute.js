import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

// Defining the PrivateRoute component
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Using the useAuth hook to access authentication data

  // Effect to check authorization when auth token changes
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth"); // Making an API call to check admin authorization
      if (res.data.ok) {
        setOk(true); // ok to true if the user is authorized
      } else {
        setOk(false);
      }
    };

    // Checking authorization only if the auth token exists
    if (auth?.token) authCheck(); // Calling the authCheck function
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />; // Returning Outlet (rendering child routes) if authorized, else displaying a Spinner
}

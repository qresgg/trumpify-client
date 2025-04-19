import { useState, useEffect } from "react";
import { login, logout, checkAuth } from "../services/auth/authService";
import { fetchUserData } from "../services/user/fetchData/fetchUserData";
import { useDispatch, useSelector } from "react-redux";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { setAuthenticated } from "../lib/redux/data/dataSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.data);
  const [message, setMessage] = useState({ success: "", error: "" });

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setAuthenticated(false));
      setMessage({ success: "Logout successful", error: "" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await login(data.email, data.password);
      dispatch(setAuthenticated(true));
      setMessage({
        success: response?.message || "Login successful!",
        error: "",
      });
    } catch (error) {
      setMessage({ success: "", error: "Error during login" });
      console.error(error.response?.data || error);
    }
  };

  return { isAuthenticated, message, handleLogout, handleLogin };
}

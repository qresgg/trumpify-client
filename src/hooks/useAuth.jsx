import { useState, useEffect } from "react";
import { login, logout, checkAuth, register } from "../services/auth/authService";
import { fetchUserData } from "../services/user/fetchData/fetchUserData";
import { useDispatch, useSelector } from "react-redux";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { setAuthenticated } from "../lib/redux/data/dataSlice";
import { isValidEmail, isValidPassword, isValidUserName } from "../lib/regexp";

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.data);
  const [ message, setMessage ] = useState({ success: "", error: "" });

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
    if (!isValidPassword(data.password) || !isValidEmail(data.email)) {
        setMessage({ error: "All fields are required", success: "" });
        return;
    }

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

  const handleRegistration = async (data) => {
    if (!isValidPassword(data.password) || !isValidEmail(data.email) || !isValidUserName(data.userName)) {
        setMessage({ error: "All fields are required", success: "" });
        return;
    }
    if (data.password !== data.passwordConfirm) {
        setMessage({ error: "Passwords do not match", success: "" });
        return;
    }

    try {
        const response = await register(data.userName, data.email, data.password);
        setMessage({ success: response.message || "Registration successful!", error: "" });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Error during registration";
        setMessage({ error: errorMessage, success: "" });
    }
  };

  return { isAuthenticated, message, handleLogout, handleLogin, handleRegistration };
}

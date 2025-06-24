import { useState, useEffect } from "react";
import { login, logout, checkAuth, register } from "../services/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../lib/redux/data/dataSlice";
import { isValidEmail, isValidPassword, isValidUserName } from "../lib/regexp";

import { useMessage } from "./global/useMessage";
import { setAuthView } from "../lib/redux/pages/viewSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.data);
  const { message, setMessage } = useMessage();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setAuthenticated(false));
      setMessage({ success: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLogin = async (data) => {
    if (!isValidPassword(data.password) || !isValidEmail(data.email)) {
        setMessage({ error: "All fields are required" });
        return;
    }

    try {
      const response = await login(data.email, data.password);
      dispatch(setAuthenticated(true));
      setMessage({ success: response?.message || "Login successful!" });
    } catch (error) {
      setMessage({ error: "Error during login" });
      console.error(error.response?.data || error);
    }
  };

  const handleRegistration = async (data) => {
    if (!isValidPassword(data.password) || !isValidEmail(data.email) || !isValidUserName(data.userName)) {
        setMessage({ error: "All fields are required" });
        return;
    }
    if (data.password !== data.passwordConfirm) {
        setMessage({ error: "Passwords do not match" });
        return;
    }

    try {
        const response = await register(data.userName, data.email, data.password);
        setMessage({ success: response.message || "Registration successful!" });
        setTimeout(() => {
          dispatch(setAuthView('login'));
        }, 2000);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Error during registration";
        setMessage({ error: errorMessage, success: "" });
    }
  };

  return { isAuthenticated, message, handleLogout, handleLogin, handleRegistration };
}

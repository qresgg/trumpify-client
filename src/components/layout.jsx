import styles from "./layout.module.scss";
import { Auth } from "./Auth/auth";
import { Header } from "./Header/header";
import { Main } from "./Main/main";
import { Footer } from "./Footer/footer";
import { useState, useEffect } from "react";
import { login, logout, checkAuth } from "../services/authService";
import { getUserData } from "../services/userService";
import { setUser as setReduxUser } from "../lib/userSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearForm = () => {
    setUserName("");
    setPassword("");
    setSuccess("Login successful");
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(userName, password);
      clearForm();
    } catch (error) {
      setError("Error during login");
      console.error(error.response ? error.response.data : error);
    }
  };

  const handleData = (userNameProp, passwordProp) => {
    setUserName(userNameProp);
    setPassword(passwordProp);
    handleSubmit({ preventDefault: () => {} });
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const token = await checkAuth();
      if (token) {
        setIsAuthenticated(true);
        navigate("/home");
        const data = await getUserData();
        
        dispatch(setReduxUser(data));
      } else {
        setIsAuthenticated(false);
        navigate("/auth");
      } 
    };

    authenticateUser();
  }, [success, dispatch]);

  return (
    <>
      {isAuthenticated ? (
        <Routes>
          <Route path="/home" element={
            <>
            <Header onLogout={logout}/>
            <Main />
            <Footer />
          </>
          } />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/auth" element={<Auth
              // user={user}
              success={success}
              error={error}
              handleData={handleData} 
            />}/>
          </Routes>
        </>
      )}
    </>
  );
}

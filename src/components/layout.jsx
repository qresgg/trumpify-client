import { Auth } from "./Auth/auth";
import { Header } from "./Header/header";
import { Main } from "./Main/main";
import { Footer } from "./Footer/footer";
import { useState, useEffect } from "react";
import { login, logout, checkAuth } from "../services/auth/authService";
import { fetchUserData } from "../services/user/fetchData/fetchUserData";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

export function Layout() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ success: "", error: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.data);
 
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = await checkAuth();
        if (token) {
          setIsAuthenticated(true);
          const userData = await fetchUserData();
          dispatch(setReduxData(userData));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    authenticateUser();
  }, [dispatch, message.success]);

  const handleData = async (inputData) => {
    try {
      await login(inputData.email, inputData.password);
      setMessage({ success: "Login successful", error: "" });
      setIsAuthenticated(true);
    } catch (error) {
      setMessage({ success: "", error: "Error during login" });
      console.error(error.response?.data || error);
    }
  };

  return (
    <>
        {isAuthenticated ? (
          <>
            <Header onLogout={logout}/>
            <Main />
            <Footer />
        </>
      ) : (
        <>
            <Auth success={message.success} error={message.error} handleData={handleData}/>
        </>
      )}
    </>
  );
}

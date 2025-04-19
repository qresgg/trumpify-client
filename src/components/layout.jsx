import { Auth } from "./Auth/auth";
import { Header } from "./Header/header";
import { Main } from "./Main/main";
import { Footer } from "./Footer/footer";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { checkAuth } from "../services/auth/authService";
import { fetchUserData } from "../services/user/fetchData/fetchUserData";
import { setAuthenticated } from "../lib/redux/data/dataSlice";
import _ from 'lodash';

export function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated, message, handleLogout } = useAuth();
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = await checkAuth();
        if (token) {
          setAuthed(true);
          const userData = await fetchUserData();
          dispatch(setReduxData(userData));
        } else {
          setAuthed(false);
        }
      } catch (error) {
        dispatch(setAuthenticated(false));
      }
    };

    authenticateUser();
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {isAuthed ? (
        <>
          <Header onLogout={handleLogout}/>
          <Main />
          <Footer />
        </>
      ) : (
        <>
          <Auth success={message.success} error={message.error} />
        </>
      )}
    </>
  );
}

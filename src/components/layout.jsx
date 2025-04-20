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
  const { isAuthenticated, message } = useAuth();
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = await checkAuth();
        if (token) {
          console.log('authed')
          setAuthed(true);
          const userData = await fetchUserData();
          dispatch(setReduxData(userData));
        } else {
          console.log('not authed')
          setAuthed(false);
        }
      } catch (error) {
        console.error('An error occurred during authentication:', error);
        dispatch(setAuthenticated(false));
      }
    };

    authenticateUser();
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {isAuthed ? (
        <>
          <Header />
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

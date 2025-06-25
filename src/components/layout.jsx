import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { Footer } from "./Footer/footer";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { checkAuth } from "../services/auth/authService";
import { fetchUserData } from "../services/user/fetchData/fetchUserData";
import { setAuthenticated } from "../lib/redux/data/dataSlice";
import _ from 'lodash';
import { useNavigate } from "react-router-dom";

export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          navigate('/');
        } else {
          console.log('not authed')
          setAuthed(false);
          navigate('/login');
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

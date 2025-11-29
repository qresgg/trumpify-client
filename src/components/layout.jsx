import styles from "./Layout.module.scss";

import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { Footer } from "./Footer/footer";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setData as setReduxData } from "../lib/redux/data/dataSlice";
import { checkAuth } from "../services/auth/authService";
import { setAuthenticated } from "../lib/redux/data/dataSlice";
import _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { useClearCachedData } from '../hooks/global/useClearCachedData'

import { fetchUserDataMy } from "../services/user.service";

export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useClearCachedData();

  const { isAuthenticated, message } = useAuth();
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = await checkAuth();
        if (token) {
          console.log('authed')
          setAuthed(true);
          const userData = await fetchUserDataMy();
          dispatch(setReduxData(userData));
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
    <div className={styles['layout']}>
      {isAuthed ? (
        <div className={styles['layout__logisty-sosut']}>
          <>
            <Header />
            <Main />
            <Footer />
          </>
        </div>
      ) : (
        <>
          <Auth success={message.success} error={message.error} />
        </>
      )}
    </div>
  );
}

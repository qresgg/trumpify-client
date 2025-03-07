    import styles from './layout.module.scss'
    import { Auth } from "./Auth/auth"
    import { Header } from "./Header/header"
    import { Main } from "./Main/main"
    import { Footer } from "./Footer/footer"
    import { useState, useEffect } from 'react'
    import { login, logout, checkAuth } from '../services/authService'
    import { getUserData } from '../services/userService'
    import axios from 'axios'

    const SERVER_API_URL = 'http://localhost:8080';

    export function Layout () {
        const [user, setUser] = useState(null);
        
        const [password, setPassword] = useState('');
        const [userName, setUserName] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        const [isAuthenticated, setIsAuthenticated] = useState(false)

        const handleSubmit = async (e) => {
            e.preventDefault(); 

            try {
                await login(userName, password);

                setUserName('');
                setPassword('');
                setSuccess('Login successful');
                setError('');
                setUser(await getUserData());
            } catch (error) {
                setError('Error during login');
                console.error(error.response ? error.response.data : error);
            }
        };

        const handleData = (userNameProp, passwordProp) => {
            setUserName(userNameProp);
            setPassword(passwordProp);
            handleSubmit({ preventDefault: () => {} });
        }
        
        useEffect(() => {
            const authenticateUser = async () => {
                const token = await checkAuth();
                if (token) {
                    setIsAuthenticated(true);
                    setUser(getUserData());
                } else {
                    setIsAuthenticated(false);
                }
            };

            authenticateUser();
        }, [success]);
        return (
            <>
            {isAuthenticated ? 
            (
            <>
            <Header onLogout={logout}/>
            <Main />
            <Footer /> 
            </>
            )
            :
            (<>
            <Auth 
                user={user} 
                success={success} 
                error={error}
                handleData={handleData}/>
            </>) 
            }
            </>
        )
    }
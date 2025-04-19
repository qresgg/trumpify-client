import { Registration } from "./components/registration";
import { Login } from "./components/login";
import { useState, useEffect } from "react";

export function Auth () {
    const [isLogin, setIsLogin] = useState(true); 

    const switchAuth = () => {
        setIsLogin(!isLogin);   
    }

    return (
        <>
            {isLogin
            ? (<Login switchAuth={switchAuth} />)
            : (<Registration switchAuth={switchAuth} />)}
        </>
    )
}
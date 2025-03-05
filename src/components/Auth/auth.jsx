import { Registration } from "./components/registration";
import { Login } from "./components/login";
import { useState } from "react";

export function Auth () {
    const [isLogin, setIsLogin] = useState(true);
    
    const handleClick = () => {
        setIsLogin(!isLogin);   
    }

    return (
        <>
        {isLogin && (<Login />)}
        {!isLogin && (<Registration />)}
        
        <button onClick={handleClick}>1231</button>
        </>
    )
}
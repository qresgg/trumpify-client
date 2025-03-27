import { Registration } from "./components/registration";
import { Login } from "./components/login";
import { useState, useEffect } from "react";

export function Auth ({
    onLogout,
    handleData
}
) {
    const [isLogin, setIsLogin] = useState(true); 

    const handleClick = () => {
        setIsLogin(!isLogin);   
    }

    return (
        <>
        {isLogin && (<Login 
            handleData={handleData}
            onLogout={onLogout}/>)}
        {!isLogin && (<Registration 
            handleClick={handleClick}/>)}
        <button onClick={handleClick}>Change</button>
    </>
    )
}
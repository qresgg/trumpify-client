import { Registration } from "./components/registration";
import { Login } from "./components/login";
import { useState } from "react";

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
        {!isLogin && (<Registration />)}
        
        <button onClick={handleClick}>1231</button>
        </>
    )
}
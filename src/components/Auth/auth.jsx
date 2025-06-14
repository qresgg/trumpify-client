import { Registration } from "./components/registration";
import { Login } from "./components/login";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

export function Auth () {
    const auth = useSelector((state) => state.view.auth);
    
    return (
        <Fragment>
            {auth.currentView === "login" && <Login />}
            {auth.currentView === "register" && <Registration />}
        </Fragment>
    )
}
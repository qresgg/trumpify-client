import Registration from "./components/Registration";
import Login from "./components/Login";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Auth () {
    const auth = useSelector((state) => state.view.auth);
    
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Registration />}/>
        </Routes>
    )
}
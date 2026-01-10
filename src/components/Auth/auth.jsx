import Registration from "./components/registration";
import Login from "./components/login";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function Auth () {
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Registration />}/>
        </Routes>
    )
}
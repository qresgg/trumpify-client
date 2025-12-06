import {basicRequestUnsecured} from "./shared/request.pattern.js";

const route = 'auth';

export const login = async (email, password) => {
    try{
        const result = await basicRequestUnsecured({
            method: 'post',
            route,
            endpoint: "login",
            data: { email, password }
        })
        localStorage.setItem('accessToken', result.access_token);
        return result;
    } catch (error){
        throw new Error(error?.response?.data?.message || 'Failed to login');
    }
}

export const register = async (username, email, password) => {
    try{
        return await basicRequestUnsecured({
            method: 'post',
            route,
            endpoint: "register",
            data: { username, email, password }
        })
    } catch (error){
        throw new Error(error?.response?.data?.message || 'Failed to fetch searched data');
    }
}

export const logout = async () => {
    try{
        localStorage.removeItem("accessToken");
        await basicRequestUnsecured({
            method: 'post',
            route,
            endpoint: "logout"
        });
        window.location.reload();
    } catch (error){
        throw new Error(error?.response?.data?.message || 'Failed to fetch searched data');
    }
}
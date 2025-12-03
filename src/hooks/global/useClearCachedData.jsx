import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearOldData } from "../../lib/redux/data/loadedSlice";

export const useClearCachedData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(clearOldData());
            console.log('cleared')
        }, 15 * 1000);
        return () => clearInterval(interval);
    }, [dispatch]);
};
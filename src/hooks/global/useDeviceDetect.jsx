import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDeviceType} from "../../lib/redux/data/dataSlice";

export function useDeviceDetect({ breakpoint = 480, debounceMs = 50 } = {}) {
    const dispatch = useDispatch();
    const [deviceType, setDeviceTypeLocal] = useState(() => {
        if (typeof window === 'undefined') return 'desktop';
        return window.innerWidth <= breakpoint ? 'mobile' : 'desktop';
    });

    const timeoutRef = useRef(null);
    const lastDispatchedRef = useRef(deviceType);

    const detectAndDispatch = useCallback(() => {
        if (typeof window === 'undefined') return;
        const newType = window.innerWidth <= breakpoint ? 'mobile' : 'desktop';
        setDeviceTypeLocal(prev => {
            if (prev === newType) return prev;
            return newType;
        });

        if (lastDispatchedRef.current !== newType) {
            dispatch(setDeviceType(newType));
            lastDispatchedRef.current = newType;
        }
    }, [breakpoint, dispatch]);

    useEffect(() => {
        detectAndDispatch();

        const onResize = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                detectAndDispatch();
            }, debounceMs);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', onResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', onResize);
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [detectAndDispatch, debounceMs]);

    return deviceType;
}

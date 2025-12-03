import { useState, useEffect } from 'react';

export function useMessage() {
    const [ message, setMessage ] = useState({ success: '', error: '' });

    useEffect(() => {
        if (message.success || message.error) {
            const timer = setTimeout(() => {
                setMessage({ success: '', error: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return { message, setMessage };
}
import { useState, useEffect } from 'react';
import { useMessage } from '../useMessage';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRegions} from "../../../services/api.service";


export default function useRegions() {
    const dispatch = useDispatch();
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setMessage } = useMessage();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                // if (!regionsRedux || regionsRedux.length === 0) {
                //     const fetched = await getRegions();
                //     fetched.sort((a, b) => a.country.localeCompare(b.country));
                //     dispatch(addToLoadedMany({ type: 'region', values: fetched }));
                //     setRegions(fetched);
                // } else {
                //     const mapped = regionsRedux.map(item => item.data).flat();
                //     setRegions(mapped);
                // }

                const fetched = await fetchRegions();
                fetched.sort((a, b) => a.country.localeCompare(b.country));
                setRegions(fetched);
            } catch (err) {
                setError('Failed to fetch regions');
                setMessage({ error: 'Failed to fetch regions' });
            } finally {
                setLoading(false);
            }
        };
        fetch();

    }, [dispatch, setMessage]);

    return { regions, loading, error };
}
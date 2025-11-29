import { useState, useEffect } from 'react';
import { getRegions } from '../../services/api/fetchReference';
import { useMessage } from '../../hooks/global/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addToLoadedMany } from '../../lib/redux/data/loadedSlice';

export default function useRegions() {
    const dispatch = useDispatch();
    const regionsRedux = useSelector((state) => state.loaded.nonClearableData.regions);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setMessage } = useMessage();

    useEffect(() => {
        const fetchRegions = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!regionsRedux || regionsRedux.length === 0) {
                    const fetched = await getRegions();
                    fetched.sort((a, b) => a.country.localeCompare(b.country));
                    dispatch(addToLoadedMany({ type: 'region', values: fetched }));
                    setRegions(fetched);
                } else {
                    const mapped = regionsRedux.map(item => item.data).flat();
                    setRegions(mapped);
                }
            } catch (err) {
                setError('Failed to fetch regions');
                setMessage({ error: 'Failed to fetch regions' });
            } finally {
                setLoading(false);
            }
        };
        fetchRegions();

    }, [dispatch, regionsRedux, setMessage]);

    return { regions, loading, error };
}
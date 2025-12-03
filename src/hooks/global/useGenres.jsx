import { useState, useEffect } from 'react';
import { getGenres } from '../../services/api/queries/getGenres';
import { useMessage } from '../../hooks/global/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addToLoadedMany } from '../../lib/redux/data/loadedSlice';

export default function useGenres() {
    const dispatch = useDispatch();
    const genresRedux = useSelector((state) => state.loaded.nonClearableData.genres);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setMessage } = useMessage();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!genresRedux || genresRedux.length === 0) {
                    const fetched = await getGenres();
                    fetched.sort((a, b) => a.name.localeCompare(b.name));
                    dispatch(addToLoadedMany({ type: 'genre', values: fetched }));
                    setGenres(fetched);
                } else {
                    const mapped = genresRedux.map(item => item.data).flat();
                    setGenres(mapped);
                }
            } catch (err) {
                setError('Failed to fetch genres');
                setMessage({ error: 'Failed to fetch genres' });
            } finally {
                setLoading(false);
            }
        };
        fetch();

    }, [dispatch, genresRedux, setMessage]);

    return { genres, loading, error };
}
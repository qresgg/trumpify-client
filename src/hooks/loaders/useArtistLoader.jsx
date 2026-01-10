import { useEffect, useState } from "react";
import {useMusicActions} from "../global/useMusicActions";
import {fetchArtistById} from "../../services/artist.service";
import {fetchPopSongs} from "../../services/api.service";
import {setView} from "../../lib/redux/pages/viewSlice";
import {useDispatch} from "react-redux";

export const useArtistLoader = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const musicPlayer = useMusicActions();

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            setLoading(true);
            try {
                const res = await fetchArtistById(id);
                const songsRes =  await fetchPopSongs(id);
                musicPlayer.selectPlaylist({ _id: res._id, songs: songsRes ?? [] });
                dispatch(setView({ view: 'currentArtistPage', value: res }));
            } catch (e) {
                console.error("Playlist load failed", e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    return { loading };
};

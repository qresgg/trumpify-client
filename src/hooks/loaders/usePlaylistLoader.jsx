import { useEffect, useState } from "react";
import {fetchAlbumById} from "../../services/api.service";
import {fetchLikedCollectionById} from "../../services/api.service";
import {useMusicActions} from "../global/useMusicActions";

export const usePlaylistLoader = (id, type) => {
    const [loading, setLoading] = useState(true);
    const musicPlayer = useMusicActions();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res =
                    type === "default"
                        ? await fetchAlbumById(id)
                        : await fetchLikedCollectionById(id);
                console.log(res)
                if (res){
                    musicPlayer.selectPlaylist(res);
                    setPlaylist(musicPlayer.res);
                };
            } catch (e) {
                console.error("Playlist load failed", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, type]);

    return { loading, playlist };
};

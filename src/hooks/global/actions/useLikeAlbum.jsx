import {useCallback, useState, useRef, useEffect} from "react";
import {likeAlbum, unLikeAlbum} from "../../../services/user.service";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserLibraryMy} from "../../../services/api.service";
import {setLib} from "../../../lib/redux/data/dataSlice";

const COOLDOWN_MS = 800;
const REQUEST_TIMEOUT_MS = 5000;

export function useLikeAlbum(albumId) {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const selectedPlaylist = useSelector((state) => state.music.playlist.selectedPlaylist);

    const lastActionTimeRef = useRef(0);
    const inFlightRef = useRef(false);

    useEffect(() => {
        setIsLiked(selectedPlaylist?.is_liked);
    }, [selectedPlaylist]);

    const toggleLike = useCallback(async () => {
        if (!albumId) return;

        const now = Date.now();
        if (inFlightRef.current) return;
        if (now - lastActionTimeRef.current < COOLDOWN_MS) return;

        lastActionTimeRef.current = now;
        inFlightRef.current = now;
        setIsLoading(true);

        const prevLiked = isLiked;

        setIsLiked(!prevLiked);

        const timeoutId = setTimeout(() => {
            inFlightRef.current = false;
            setIsLoading(false);
        }, REQUEST_TIMEOUT_MS);

        try{
            if (prevLiked) {
                await unLikeAlbum(albumId)
                const r = await fetchUserLibraryMy();
                dispatch(setLib(r));
            } else {
                await likeAlbum(albumId)
                const r = await fetchUserLibraryMy();
                dispatch(setLib(r));
            }
        } catch (error){
            setIsLiked(prevLiked);
            console.error("Like error", error);
        } finally {
            clearTimeout(timeoutId);
            inFlightRef.current = false;
            setIsLoading(false);
        }
    }, [albumId, isLiked, setIsLoading]);

    return {
        isLiked,
        isLoading,
        toggleLike,
    };
}
import {useCallback, useState, useRef} from "react";
import {likeAlbum, unLikeAlbum} from "../../../services/user.service";
import {useDispatch, useSelector} from "react-redux";

const COOLDOWN_MS = 800;
const REQUEST_TIMEOUT_MS = 5000;

export function useLikeAlbum() {
    const dispatch = useDispatch();
    const [albumId, setAlbumId] = useState(null);
    const [isLiked, setIsLiked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const lastActionTimeRef = useRef(0);
    const inFlightRef = useRef(false);

    const toggleLike = useCallback(async () => {
        const now = Date.now();
        if (now - lastActionTimeRef.current < COOLDOWN_MS) {
            return;
        }
        if (inFlightRef.current) {
            return;
        }
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
            } else {
                await likeAlbum(albumId)
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

    const updateAlbum = (newAlbum) => {
        setAlbumId(newAlbum.id);
        setAlbumId(newAlbum.is_liked);
    }

    return {
        isLiked,
        isLoading,
        toggleLike,
    };
}
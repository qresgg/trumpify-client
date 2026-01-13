import {useCallback, useState, useRef, useEffect} from "react";
import {likeAlbum, unLikeAlbum} from "../../../services/user.service";
import {useDispatch, useSelector} from "react-redux";

const COOLDOWN_MS = 800;
const REQUEST_TIMEOUT_MS = 5000;

export function useLikeAlbum(albumId, initLike) {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const lastActionTimeRef = useRef(0);
    const inFlightRef = useRef(false);

    useEffect(() => {
        if (typeof initLike === 'boolean') {
            setIsLiked(initLike);
        }
    }, [albumId]);

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

    return {
        isLiked,
        isLoading,
        toggleLike,
    };
}
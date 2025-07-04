import { useState, useEffect } from "react";
import { fetchLikedCollection } from "../../services/user/fetchData/fetchLikedCollection";
import { setSelectedPlaylist } from "../../lib/redux/music/musicState";
import { useDispatch, useSelector } from "react-redux";

export const useLikedCollection = () => {
    const dispatch = useDispatch();
    const [ likedSongs, setLikedSongs ] = useState([]);
    const { selectedPlaylist } = useSelector((state) => state.music.playlist)

    useEffect(() => {
        const fetchLiked = async () => {
            try{
                const response = await fetchLikedCollection();
                setLikedSongs(response.songs);
                dispatch(setSelectedPlaylist(response));
            } catch (error) {
                console.error(error);
                setLikedSongs([]);
            }
        }
        fetchLiked();
    }, []);

    return likedSongs;
}
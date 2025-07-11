import { useState, useEffect } from "react";
import { fetchLikedCollection } from "../../services/user/queries/fetchLikedCollection";
import { setSelectedPlaylist } from "../../lib/redux/music/musicState";
import { useDispatch, useSelector } from "react-redux";

export const useLikedCollection = ({ id }) => {
    const dispatch = useDispatch();
    const [ likedSongs, setLikedSongs ] = useState([]);
    const { selectedPlaylist } = useSelector((state) => state.music.playlist)

    useEffect(() => {
        const fetchLiked = async () => {
            try{
                const response = await fetchLikedCollection(id);
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
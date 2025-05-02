import { useState, useEffect } from "react";
import getPopularSongsArtistPage from "../../services/artist/data/get/popularSongsData";
import { useSelector } from "react-redux";

export const usePopularSongs = () => {
    const [ songs, setSongs ] = useState([]);
    const { currentArtistPage } = useSelector((state) => state.view)
    
    useEffect(() => {
        const fetchPopularSongs = async () => {
            try{
                const response = await getPopularSongsArtistPage(currentArtistPage?.artist_id);
                setSongs(response);
            } catch (error) {
                console.error('Error during fetching data...', error);
            }
        }
        fetchPopularSongs();
    }, [currentArtistPage])

    return songs;
}
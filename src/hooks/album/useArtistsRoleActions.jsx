import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'

export function useArtistsRoleActions() {
    const dispatch = useDispatch();
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);
    const [ artists, setArtists ] = useState([]);
  
    const removeArtist = (artistIndex, setArtists) => {
        setArtists((prevArtists) => prevArtists.filter((_, index) => index !== artistIndex));
    };

    const removeRoleFromArtist = (artistName, role) => {
        setArtists((prevArtists) => {
            return prevArtists.map((artist) => {
                if (artist.name === artistName) {
                    return { ...artist, roles: artist.roles.filter((r) => r !== role) };
                }
                return artist;
            }).filter((artist) => artist.roles.length > 0);
        });
    };
    const addArtistWithRole = (artistName, role) => {
        setArtists((prevArtists) => {
            const existingArtist = prevArtists.find((artist) => artist.name === artistName);

            const rolesToAdd = Array.isArray(role) ? role : [role];

            if (existingArtist) {
                const updatedArtists = prevArtists.map((artist) => {
                    if (artist.name === artistName) {
                        const mergedRoles = [...artist.roles];
                        rolesToAdd.forEach((r) => {
                            if (!mergedRoles.includes(r)) {
                                mergedRoles.push(r);
                            }
                        });
                        return { ...artist, roles: mergedRoles };
                    }
                    return artist;
                });
                return updatedArtists;
            }

            return [...prevArtists, { name: artistName, roles: rolesToAdd }];
        });
    };


    return { removeArtist, removeRoleFromArtist, addArtistWithRole, artists, setArtists };
}
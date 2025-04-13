import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMusicPlaying: false,
    activePlaylist: null,
    activeSong: null,
    activeSongId: null,
    selectedPlaylist: null,
    selectedSong: null
    
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setActivePlaylist: (state, action) => {
            state.activePlaylist = action.payload;
            state.isMusicPlaying = true;
        },
        setActiveSong: (state, action) => {
            state.activeSong = action.payload.song;
            state.activeSongId = action.payload.index;
            state.isMusicPlaying = true;
        },
        setSelectedSong: (state, action ) => {
            state.selectedSong = action.payload;
        },
        setSelectedPlaylist: (state, action ) => {
            state.selectedPlaylist = action.payload;
        },
        togglePlaylistPlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        togglePlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        stopMusic: (state) => {
            state.isMusicPlaying = false;
            state.activeSong = null;
        },
    },
});

export const { 
    setActivePlaylist,
    setActiveSong,
    setSelectedSong,
    setSelectedPlaylist,
    togglePlaylistPlayback,
    togglePlayback,
    stopMusic } = musicSlice.actions;
export default musicSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMusicPlaying: false,
    song: {
        selectedSong: null,
        activeSong: null,
        prevSong: null,
        nextSong: null
    },
    playlist: {
        selectedPlaylist: null, 
        activePlaylist: null
    }
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setActivePlaylist: (state, action) => {
            state.playlist.activePlaylist = action.payload;
            state.isMusicPlaying = true;
        },
        setActiveSong: (state, action) => {
            state.song.activeSong = action.payload.song;
            state.isMusicPlaying = true;
        },
        setPrevSong: (state, action) => {
            state.song.prevSong = action.payload;
        },
        setNextSong: (state, action) => {
            state.song.nextSong = action.payload;
        },
        setSelectedSong: (state, action ) => {
            state.song.selectedSong = action.payload;
        },
        setSelectedPlaylist: (state, action ) => {
            state.playlist.selectedPlaylist = action.payload;
        },
        togglePlaylistPlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        togglePlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        stopMusic: (state) => {
            state.isMusicPlaying = false;
            state.song.activeSong = null;
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
    stopMusic,
    setPrevSong,
    setNextSong } = musicSlice.actions;
export default musicSlice.reducer;

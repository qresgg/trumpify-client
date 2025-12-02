import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMusicPlaying: false,
    currentIndex: 0,
    song: {
        selectedSong: null,
        activeSong: null,
        nextSong: null
    },
    playlist: {
        selectedPlaylist: null, 
        activePlaylist: null,
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
            state.currentIndex = action.payload.index;
            state.isMusicPlaying = true;
        },
        setPrevSong: (state, action) => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
                state.song.activeSong = state.playlist.activePlaylist.songs[state.currentIndex];
            }
        },
        setNextSong: (state, action) => {
            if (state.playlist.activePlaylist?.songs && 
                state.currentIndex < state.playlist.activePlaylist.songs.length - 1) 
                {
                state.currentIndex += 1;
                state.song.activeSong = state.playlist.activePlaylist.songs[state.currentIndex];
            }
        },
        setSelectedSong: (state, action ) => {
            state.song.selectedSong = action.payload;
            state.song.nextSong = state.playlist.activePlaylist?.songs[state.currentIndex + 1];
        },
        setSelectedPlaylist: (state, action ) => {
            state.playlist.selectedPlaylist = action.payload;
        },
        togglePlaylistPlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        togglePlayback: (state) => {
            state.isMusicPlaying = !state.isMusicPlaying;
            if(state.isMusicPlaying && !state.song.activeSong) {
                state.song.activeSong = state.song.selectedSong;
            }
        },
        stopMusic: (state) => {
            state.isMusicPlaying = false;
            state.song.activeSong = null;
            state.currentIndex = 0;
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

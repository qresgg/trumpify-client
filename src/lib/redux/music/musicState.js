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
        // SET
        setActivePlaylist: (state, action) => {
            state.playlist.activePlaylist = action.payload;
            state.isMusicPlaying = true;
        },
        setActiveSong: (state, action) => {
            state.song.activeSong = action.payload.song;
            state.currentIndex = action.payload.index;
            state.isMusicPlaying = true;

            if(state.playlist.selectedPlaylist && !state.song.selectedSong){
                state.song.activeSong = action.payload.song;
                state.currentIndex = action.payload.index;
                state.playlist.activePlaylist = state.playlist.selectedPlaylist;
            }
        },
        selectSong: (state, action ) => {
            state.song.selectedSong = action.payload;
            if(state.playlist.activePlaylist && state.playlist.activePlaylist.songs.length > 1){
                state.song.nextSong = state.playlist.activePlaylist?.songs[state.currentIndex + 1];
            }
        },
        selectPlaylist: (state, action ) => {
            state.playlist.selectedPlaylist = action.payload;
        },

        // CONTROL STATE
        prevSong: (state, action) => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
                state.song.activeSong = state.playlist.activePlaylist.songs[state.currentIndex];
            }
        },
        nextSong: (state, action) => {
            if (state.playlist.activePlaylist?.songs && 
                state.currentIndex < state.playlist.activePlaylist.songs.length - 1) 
                {
                state.currentIndex += 1;
                state.song.activeSong = state.playlist.activePlaylist.songs[state.currentIndex];
            }
        },
        togglePlayback: (state) => {
            if(state.isMusicPlaying && !state.song.activeSong || state.song.activeSong !== state.song.selectedSong && state.song.selectedSong) {
                state.song.activeSong = state.song.selectedSong;
            }
            state.isMusicPlaying = !state.isMusicPlaying;
        },
        play: (state, action ) => {
            if(state.isMusicPlaying && !state.song.activeSong || state.song.activeSong !== state.song.selectedSong && state.song.selectedSong) {
                state.song.activeSong = state.song.selectedSong;
            }
            state.isMusicPlaying = true;
        },
        pause: (state, action ) => {
            state.isMusicPlaying = true;
        },
        stop: (state) => {
            state.isMusicPlaying = false;
            state.song.activeSong = null;
            state.currentIndex = 0;
        },

        // REMOVE
        closeSelectedPlaylist(state, action) {
            state.playlist.selectedPlaylist = null;
        },
        closeSelectedSong(state, action) {
            state.song.selectedSong = null;
        },
        closeActivePlaylist(state, action) {
            state.playlist.activePlaylist = null;
        },
        closeActiveSong(state, action) {
            state.song.activeSong = null;
        }
    },
});

export const musicPlayer = musicSlice.actions;
export default musicSlice.reducer;

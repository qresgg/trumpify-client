import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMusicPlaying: false,
    activePlaylistIndex: null,
    activePlaylist: null,
    activeTrackIndex: null,
    activeTrack: null,
    selectedPlaylist: null,
    selectedSong: null
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setActivePlaylist: (state, action) => {
            if (state.activePlaylistIndex !== action.payload.id) {
                state.activeTrack = null;
                state.activeTrackIndex = null;
            }
            state.activePlaylist = action.payload.selectedPlaylist;
            state.activePlaylistIndex = action.payload.id;
            state.isMusicPlaying = true;
        },
        setActiveTrack: (state, action) => {
            state.isMusicPlaying = true;
            state.activeTrackIndex = action.payload.index;
            state.activeTrack = action.payload.song;
            state.activePlaylistIndex = action.payload.id;
        },
        setSelectedSong: (state, action ) => {
            state.selectedSong = action.payload.song;
        },
        setSelectedPlaylist: (state, action ) => {
            state.selectedPlaylist = action.payload.playlist;
        },
        playPlaylist: (state, action) => {
            if (state.activePlaylist && state.activePlaylistIndex !== action.payload) {
                state.isMusicPlaying = false;
                state.activeTrack = null;
                state.activeTrackIndex = null;
            }
            state.isMusicPlaying = true;
            state.activePlaylistIndex = action.payload;
        },
        pauseMusic: (state) => {
            state.isMusicPlaying = false;
        },
        playTrack: (state, action) => {
            if (state.activeTrack && state.activeTrackIndex !== action.payload.index) {
                state.isMusicPlaying = false;
            }
            state.activeTrackIndex = action.payload.index;
            state.activeTrack = action.payload.song;
            state.isMusicPlaying = true;
        },
        pauseTrack: (state) => {
            state.isMusicPlaying = false;
        },
        stopMusic: (state) => {
            state.isMusicPlaying = false;
            state.activePlaylistIndex = null;
            state.activeTrackIndex = null;
            state.activeTrack = null;
        },
    },
});

export const { playPlaylist, pauseMusic, setActivePlaylist, setActiveTrack, playTrack, pauseTrack, stopMusic, setSelectedSong, setSelectedPlaylist } = musicSlice.actions;
export default musicSlice.reducer;

import { playPlaylist, pauseMusic, playTrack, setActivePlaylist, setActiveTrack } from "../lib/musicState";

class MusicPlayer {
    constructor(dispatch, id, playlist, activePlaylistIndex, activeTrackIndex, activeTrack, isMusicPlaying) {
        this.dispatch = dispatch;
        this.id = id;
        this.playlist = playlist;
        this.activePlaylistIndex = activePlaylistIndex;
        this.activeTrackIndex = activeTrackIndex;
        this.activeTrack = activeTrack;
        this.isMusicPlaying = isMusicPlaying;

        this.state = {
            isPlaying: false,
            isHovering: false
        };
    }

    updateState() {
        if (this.isMusicPlaying) {
            if (this.activePlaylistIndex === this.id && (this.activeTrackIndex === null || this.activeTrackIndex === this.activeTrackIndex)) {
                this.state.isPlaying = true;
            } else {
                this.state.isPlaying = false;
            }
        } else {
            this.state.isPlaying = false;
        }
    }

    togglePlay() {
        const { isPlaying } = this.state;

        if (isPlaying) {
            this.dispatch(pauseMusic());
        } else {
            this.dispatch(playPlaylist(this.id));

            if (this.activePlaylistIndex !== this.id) {
                if (this.playlist) {
                    this.dispatch(playTrack({ song: this.playlist.tracks[0], index: 1 }));
                }
            } else if (this.activeTrackIndex !== null) {
                this.dispatch(playTrack({ song: this.activeTrack, index: this.activeTrackIndex }));
            }
        }

        this.state.isPlaying = !isPlaying;
    }

    handleItemClick(type, index) {
        if (type === 'playlist') {
            this.dispatch(setActivePlaylist({ playlist: this.playlist, id: this.id }));
        } else if (type === 'song') {
            this.dispatch(setActiveTrack({ index, song: this.playlist.tracks[index], id: this.id }));
        }
        this.togglePlay();
    }

    setHovering(isHovering) {
        this.state.isHovering = isHovering;
    }
}

export default MusicPlayer;

class PlaylistDuration {
    constructor(playlist){
        this.playlist = playlist;
    }

    convertToSeconds = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    convertToHumanReadable = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        let result = '';
        if (hours > 0) result += `${hours}h `;
        result += `${minutes}m`;
        return result.trim();
    }

    get trackInfo() {
        return this.playlist ? this.playlist?.songs.length : 0;
    }

    get totalDurationInSeconds() {
        return this.playlist
            ? this.playlist.songs.reduce((acc, track) => acc + this.convertToSeconds(track.duration), 0)
            : 0;
    }

    get totalDuration() {
        return this.convertToHumanReadable(this.totalDurationInSeconds);
    }
}


export default PlaylistDuration;
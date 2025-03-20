
class AlbumTrackInfo{
    constructor(playlist){
        this.playlist = playlist;
    }
    convertToSeconds = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }
    convertToMMSS = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
        
    get trackInfo(){
        return this.playlist ? this.playlist?.songs.length : 0;
    }
    get totalDurationInSeconds(){
        return this.playlist
      ? this.playlist.songs.reduce((acc, track) => acc + this.convertToSeconds(track.duration), 0)
      : 0;
    }
    
    get totalDuration() {
        return this.convertToMMSS(this.totalDurationInSeconds);
    }
}

export default AlbumTrackInfo;
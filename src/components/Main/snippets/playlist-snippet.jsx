import style from './playlist-snippet.module.scss';
export function Playlist({
    playlist,
    libWidth
}) {
    const regex = /[\s.,']+/g;
    const formattedArtist = playlist ? playlist.artist.replace(regex, '').toLowerCase() : null;
    const formattedTitle = playlist ? playlist.title.replace(regex, '').toLowerCase(): null;

    const urlImage = playlist ? `/album-covers/${formattedArtist}_${formattedTitle}.jpg` : null;
    const albumCover = playlist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    return (
        <div className={style.playlist}>
            <div className={style.playlist__art} style={albumCover}></div>
            <div className={style.playlist__info}>
                <div className={style.playlist_Name}>{playlist.title}</div>
                <div className={style.playlist_AdditionalInfo}><p style={{display: libWidth < 950 ? 'none' : 'block'}}>{playlist.type}</p>&nbsp; • &nbsp;<p>{playlist.artist}</p></div>
            </div>
        </div>
    )
}
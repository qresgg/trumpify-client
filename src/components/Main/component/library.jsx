import styles from './library.module.scss';
import { useState } from 'react';

import { Playlist } from '../snippets/playlist-snippet';

export function Library({ width, onResize, playlists, onSelectPlaylist, albumCover}) {
    return (
        <>
        <div className={styles.library} style={{ width: `${width}px`}}>
            <div className={styles.library__tags}>
                <div className={styles.title}>
                    <div className={styles.mediatek}>
                        <div className={styles.mediatek__icon}></div>
                        <div className={styles.mediatek__title}>My mediatek</div>
                    </div>
                    <div className={styles.new__playlist}></div>
                    <div className={styles.max__resize}></div>
                </div>
                <div className={styles.tag}></div>
            </div>
            <div className={styles.library__playlists}>
                {playlists.map((playlist, index) => (
                    <div onClick={() => onSelectPlaylist(playlist, playlist._id)} key={index}>
                        <Playlist 
                            playlist={playlist} 
                            key={index} 
                            libWidth={width} 
                            albumCover={albumCover} 
                            ID={playlist._id}/>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.resizer} onMouseDown={onResize}></div>
        </>
    );
}
import styles from '../main.module.scss';
import { useState, useEffect } from "react";
import { Playlist } from '../snippets/playlist-snippet';

export function Library({ width, onResize, playlists, onSelectPlaylist}) {

    return (
        <>
        <div className={styles.library} style={{ width: `${width}px`}}>
            <div className={styles.library__tags}>
                <div className={styles.title}>
                    <div className={styles.mediatek}>
                        <div className={styles.mediatek__icon}></div>
                        <div className={styles.mediatek__title}></div>
                    </div>
                    <div className={styles.new__playlist}></div>
                    <div className={styles.max__resize}></div>
                </div>
                <div className={styles.tag}></div>
            </div>
            <div className={styles.library__playlists}>
                {playlists.map((playlist, index) => (
                    <div onClick={() => onSelectPlaylist(playlist)}>
                        <Playlist playlist={playlist} key={index} libWidth={width} />
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.resizer} onMouseDown={onResize}></div>
        </>
    );
}
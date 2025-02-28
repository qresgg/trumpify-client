import styles from './main.module.scss';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Library } from './component/library';
import { Info } from './component/info';
import { ForYou } from './component/foryou';
import { useResizable } from './hooks/useResizable.jsx';
import playlistsData from "../../data/playlists.json";

export function Main() {
    const library = useResizable(1000);
    const info = useResizable(1000);
    const isResizing = useSelector((state) => state.isResizing);
    const [playlists, setPlaylists] = useState(playlistsData);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
    }

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            <Library width={library.width} onResize={library.handleMouseDown} playlists={playlists} onSelectPlaylist={handleSelectPlaylist}/>
            <ForYou selectedPlaylist={selectedPlaylist} />
            <Info width={info.width} onResize={info.handleMouseDown} />
        </div>
    );
}


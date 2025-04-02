import styles from './main.module.scss';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Library } from './component/library';
import { Info } from './component/info';
import { ForYou } from './component/foryou';
import { useResizable } from '../../hooks/useResizable';
import { getAlbumData } from '../../services/user/userService';

export function Main() {
    const library = useResizable(370);
    const info = useResizable(370);

    const isResizing = useSelector((state) => state.isResizing);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getAlbumData();
                setPlaylists(response);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
      }, []);

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            <Library 
                width={library.width} 
                onResize={library.handleMouseDown} 
                playlists={playlists} />
            <ForYou />
            <Info 
                width={info.width} 
                onResize={info.handleMouseDown}/>
        </div>
    );
}


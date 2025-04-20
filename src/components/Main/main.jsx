import styles from './main.module.scss';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Library } from './component/library';
import { Info } from './component/info';
import { ForYou } from './component/foryou';
import { useResizable } from '../../hooks/useResizable';
import { getAlbumData } from '../../services/artist/fetchData/fetchAlbumData';

export function Main() {
    const library = useResizable(370);
    const info = useResizable(370);

    const isResizing = useSelector((state) => state.isResizing);
    

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            <Library 
                width={library.width} 
                onResize={library.handleMouseDown}/>
            <ForYou />
            <Info 
                width={info.width} 
                onResize={info.handleMouseDown}/>
        </div>
    );
}


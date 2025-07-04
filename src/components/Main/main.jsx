import styles from './main.module.scss';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Library from './component/Library';
import Info from './component/Info';
import ForYou from './component/ForYou';
import { useResizable } from '../../hooks/useResizable';

export default function Main() {
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


import { useEffect, useRef, useState } from "react";
import React from 'react';
import { useSelector } from "react-redux";

export function useSlider(){
    const containerRef = useRef(null);
    const [ itemsShow, setItemsShow ] = useState(null)
    const selectedSong = useSelector((state) => state.music.song.selectedSong)

    useEffect(() => {
        const updateItemsShow = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const itemMinWidth = 160; 

            const count = Math.floor(containerWidth / itemMinWidth);
            setItemsShow(Math.max(1, count));
        };

        updateItemsShow();
        window.addEventListener('resize', updateItemsShow);
        return () => window.removeEventListener('resize', updateItemsShow);
    }, [selectedSong]);

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: itemsShow,
      slidesToScroll: itemsShow,
      arrows: false,
      draggable: true,
      swipe: true,
      dots: true,
      customPaging: i => (
        <div style={{
            width: "8px",
            height: "8px",
            backgroundColor: "black",
            borderRadius: "50%"
        }} />
        ),
        appendDots: dots => (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", bottom: '-35px'}}>
                <ul style={{ display: "flex", padding: 0 }}>
                    {
                    dots.map((dot, index) => (
                        <li
                        key={index}
                        className={dot.props.className} 
                        style={{
                            listStyle: "none"
                        }}
                        >
                        {React.cloneElement(dot.props.children, {
                            style: {
                            ...dot.props.children.props.style,
                            backgroundColor: dot.props.className.includes("slick-active") ? "#1ED660" : "white"
                            }
                        })}
                        </li>
                    ))
                    }
                </ul>
            </div>
        )
        
    }

    return { settings, containerRef }
}
import { useEffect, useRef, useState } from "react";

export function useSlider(){
    const containerRef = useRef(null);
    const [ itemsShow, setItemsShow ] = useState(null)

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
    }, []);

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: itemsShow,
      slidesToScroll: 1
    }

    return { settings, containerRef }
}
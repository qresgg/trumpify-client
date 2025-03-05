import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setResizing } from "../lib/resizer";

export function useResizable(initialWidth) {
    const [width, setWidth] = useState(initialWidth);
    const dispatch = useDispatch();

    const handleMouseDown = (event) => {
        dispatch(setResizing(true));
        const startX = event.clientX;
        const startWidth = width;

        const handleMouseMove = (moveEvent) => {
            let newWidth = startWidth + (moveEvent.clientX - startX);
            newWidth = Math.max(100, Math.min(2000, newWidth));
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            dispatch(setResizing(false));
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return { width, handleMouseDown }; 
}

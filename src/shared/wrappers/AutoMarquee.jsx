import { useEffect, useRef, useState } from "react";
import styles from "./styles/autoMarquee.module.scss";

export default function AutoMarquee({ children, speed = 40, ctWidth = 150}) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const [shouldScroll, setShouldScroll] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const containerWidth = ctWidth;
        const textWidth = textRef.current.scrollWidth;

        setShouldScroll(textWidth > containerWidth);
        console.log(textWidth > containerWidth);
    }, [children]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) obs.observe(containerRef.current);

        return () => obs.disconnect();
    }, []);

    const duration =
        textRef.current?.scrollWidth
            ? textRef.current.scrollWidth / speed
            : 5;

    return (
        <div ref={containerRef} className={styles.features}>
          <div ref={textRef} className={`${styles.features__marquee} ${shouldScroll ? styles.active : ''}`}>
            {children}
          </div>
        </div>
    );
}

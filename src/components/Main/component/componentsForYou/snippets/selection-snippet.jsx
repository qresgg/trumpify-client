import { redirectPlaylist } from "../../../../../services/global/functions/redirection";
import styles from "./selection-snippet.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Play } from "lucide-react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export function Selection({ title, fetchFunction }) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [centerSlidePercentage, setCenterSlidePercentage] = useState(15);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFunction();
                console.log(response)
                setItems(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchFunction]);

    const renderItem = (item, type, index) => {
        switch (type) {
            case "Album":
                return (
                    <div key={index} className={styles.item}>
                        <div className={styles.playButton}><Play color="black" /></div>
                        <div className={styles.item__container} onClick={() => redirectPlaylist(item, 'playlist', dispatch)}>
                          <div className={styles.cover} style={{ backgroundImage: `url(${item.cover})` }} />
                          <div className={styles.title} title={item.title}>{item.title}</div>
                          <div className={styles.author}>{item.artist_name}</div>
                        </div>
                    </div>
                );
            case "Song":
                return (
                    <div key={index} className={styles.item}>
                        <div className={styles.playButton}><Play color="black" /></div>
                        <div className={styles.item__container}>
                          <div className={styles.cover} style={{ backgroundImage: `url(${item.song_cover})` }} />
                          <div className={styles.title} title={item.title}>{item.title}</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const updateCenterSlidePercentage = () => {
          if (window.innerWidth < 600) {
            setCenterSlidePercentage(50);
          } else if (window.innerWidth < 1300) {
            setCenterSlidePercentage(30); 
          } else if (window.innerWidth < 1550) {
            setCenterSlidePercentage(20); 
          } else {
            setCenterSlidePercentage(15);
          }
        };
        updateCenterSlidePercentage();
        window.addEventListener('resize', updateCenterSlidePercentage);
        return () => window.removeEventListener('resize', updateCenterSlidePercentage);
      }, [window.innerWidth]);
    

    return (
        <div className={styles.selections}>
            <div className={styles.selections__container}>
                <div className={styles.selections__container__title}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.showall}>Show all</div>
                </div>
                <div className={styles.selections__container__content}>
                    {loading 
                      ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className={styles.item}>
                            <Skeleton height={153} width={153} baseColor="#4B4B4B" highlightColor="#1ED760" />
                            <Skeleton height={20} width="100%" baseColor="#4B4B4B" highlightColor="#1ED760" />
                            <Skeleton height={20} width="100%" baseColor="#4B4B4B" highlightColor="#1ED760" />
                        </div>
                      )) 
                      : 
                      <Carousel 
                        centerMode={true} 
                        centerSlidePercentage={centerSlidePercentage} 
                        infiniteLoop={true} 
                        showThumbs={false}
                        // autoPlay={true} 
                        // interval={3000} 
                        stopOnHover={true}
                        swipeable={true} 
                        showIndicators={false}
                        selectedItem={1}
                        className={styles.carousel}
                        >
                        {Array.isArray(items) && items.map((item, index) => renderItem(item, item.definition, index))}
                      </Carousel>}
                </div>
            </div>
        </div>
    );
}

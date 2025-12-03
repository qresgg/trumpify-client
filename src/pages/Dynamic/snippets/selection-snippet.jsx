import styles from "./selection-snippet.module.scss";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { AlbumItem  } from "../../../shared/items/albumItem";
import { SongItem  } from "../../../shared/items/songItem";
import { useSlider } from "../../../hooks/global/useSlider";

import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export function Selection({ title, fetchFunction, id = null }) {
    const [ items, setItems] = useState([]);
    const [ loading, setLoading] = useState(true);
    const { settings, containerRef } = useSlider()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFunction(id && id);
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
          return <AlbumItem key={index} item={item} />
        case "Song":
          return <SongItem key={index} item={item} />
        default:
          return null;
      }
    };
    
    return (
        <div className={styles.selections}>
          <div className={styles.selections__container}>
              <div className={styles.selections__container__title}>
                  <div className={styles.title}>{title}</div>
                  {/* <div className={styles.showall}>Show all</div> */}
              </div>
              <div className={styles.selections__container__content} ref={containerRef}>
                  {loading 
                    ? <div className={styles.skeleton}>
                      {Array.from({ length: settings.slidesToShow }).map((_, index) => (
                      <div key={index} className={styles.item}>
                          <Skeleton height={153} width={153} baseColor="#4B4B4B" highlightColor="#1ED760" />
                          <Skeleton height={20} width="100%" baseColor="#4B4B4B" highlightColor="#1ED760" />
                          <Skeleton height={20} width="100%" baseColor="#4B4B4B" highlightColor="#1ED760" />
                      </div>
                    ))}
                    </div> 
                    : 
                    <Slider {...settings}>
                      {Array.isArray(items) && items.map((item, index) => renderItem(item, item.definition, index))}
                    </Slider>}
              </div>
          </div>
        </div>
    );
}

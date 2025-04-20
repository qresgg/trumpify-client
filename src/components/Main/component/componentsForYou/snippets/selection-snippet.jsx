import { redirectPlaylist } from "../../../../../services/global/functions/redirection";
import styles from "../homePage.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import { Play } from "lucide-react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function Selection({ title, fetchFunction }) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFunction();
                setItems(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [fetchFunction])

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: Math.min(5, items.length),
        slidesToScroll: 1
    }

  const renderItem = (item, type, index) => {
    switch (type) {
        case "Album":
            return (
                <div key={index} className={styles.selections__container__content__item} onClick={() => redirectPlaylist(item, 'playlist', dispatch)}>
                    <div className={styles.playButton}><Play color='black'/></div>
                    <div className={styles.cover} style={{ backgroundImage: `url(${item.cover})` }}></div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.author}>{item.artist_name}</div>
                </div>
            );
          case "Song":
            return (
                <div key={index} className={styles.selections__container__content__item}>
                    <div className={styles.playButton}><Play color='black'/></div>
                    <div className={styles.cover} style={{ backgroundImage: `url(${item.song_cover})` }}></div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.author}>{item.features.map((feat) => feat)}</div>
                </div>
            )
          default:
            return item;
        }
  }

  return (
    <>
      <div className={styles.selections}>
        <div className={styles.selections__container}>
          <div className={styles.selections__container__title}>
            <div className={styles.title}>{title}</div>
            <div className={styles.showall}>Show all</div>
          </div>
          <div className={styles.selections__container__content}>
            {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className={styles.selections__container__content__item}>
                            <Skeleton height={153} width={153} baseColor="#4B4B4B" highlightColor="#1ED760" />
                            <Skeleton height={20} width={`100%`} baseColor="#4B4B4B" highlightColor="#1ED760" />
                            <Skeleton height={20} width={`100%`} baseColor="#4B4B4B" highlightColor="#1ED760" />
                        </div>
                    ))
                : <Slider {...settings}>
                    {items?.map((item, index) => renderItem(item, item.definition, index))}
                    </Slider>}
          </div>
        </div>
      </div>
    </>
  );
}
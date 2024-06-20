import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import styles from "../styles/Favorite.module.css";
import favorite from "../images/fav_added.svg";
import favoritePage from "../images/favorite.png";
import { Photo } from "../types/types";

function Favorites() {
  const favorites: Photo[] = useAppSelector(
    (state) => state.favorites.entities
  );
  const [selectedPhoto, setSelectedPhoto] = useState<null | {
    url: string;
    title: string;
  }>(null);

  const handlePhotoClick = (photo: { url: string; title: string }) => {
    setSelectedPhoto(photo);
  };

  return (
    <div>
      {favorites.length === 0 && (
        <div className={styles.favorites}>
          <img src={favoritePage} alt="" />
          <p className={styles.heading}>Список избранного пуст</p>
          <p className={styles.text}>
            Добавляйте изображения, нажимая на звездочки
          </p>
        </div>
      )}
      <div className={styles.photos}>
        {favorites.map((photo: Photo) => (
          <div className={styles.photo_item}>
            <div
              key={photo.id}
              className={styles.photo}
              onClick={() => handlePhotoClick(photo)}
            >
              <img src={photo.url} alt={photo.title} title={photo.title} />
              <img src={favorite} alt="favorite" className={styles.favorite} />
            </div>
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  fetchAlbumsByUser,
  fetchPhotosByAlbum,
} from "../store/apiSlice";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";
import styles from "../styles/Catalog.module.css";
import openIcon from "../images/open.svg";
import closeIcon from "../images/close.svg";
import notfavorite from "../images/fav_inactive.svg";
import favorite from "../images/fav_added.svg";
import { Photo } from "../types/types";
import Modal from "./Modal";

function Catalog() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.entities);
  const loading = useAppSelector((state) => state.users.loading);
  const favorites = useAppSelector((state) => state.favorites.entities);
  const [albumsVisible, setAlbumsVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [photosVisible, setPhotosVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [iconStates, setIconStates] = useState<{ [key: number]: string }>({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleShowAlbums(userId: number) {
    dispatch(fetchAlbumsByUser(userId));
    setAlbumsVisible((prev) => ({ ...prev, [userId]: !prev[userId] }));
    setIconStates((prev) => ({
      ...prev,
      [userId]: !prev[userId] ? "close" : "open",
    }));
  }

  function handleShowPhotos(albumId: number) {
    dispatch(fetchPhotosByAlbum(albumId));
    setPhotosVisible((prev) => ({ ...prev, [albumId]: !prev[albumId] }));
    console.log(dispatch(fetchPhotosByAlbum(albumId)));
    setIconStates((prev) => ({
      ...prev,
      [albumId]: !prev[albumId] ? "close" : "open",
    }));
  }

  function handleFavorite(photo: Photo) {
    const isFavorite = favorites.some((fav) => fav.id === photo.id);
    if (!isFavorite) {
      dispatch(addFavorite(photo));
    } else {
      dispatch(removeFavorite(photo.id));
    }
  }

  const handleModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "failed" && <p>Failed to load.</p>}
      {loading === "succeeded" &&
        users.map((item) => (
          <div>
            <div className={styles.item} key={item.id}>
              <span>
                <img
                  src={iconStates[item.id] === "close" ? closeIcon : openIcon}
                  alt="open icon"
                  onClick={() => handleShowAlbums(item.id)}
                />
              </span>
              <p>{item.name}</p>
            </div>
            <div className={styles.albums}>
              {albumsVisible[item.id] &&
                item.albums?.map((album) => (
                  <div key={album.albumId} className={styles.album}>
                    <div className={styles.album_info}>
                      <img
                        src={
                          iconStates[album.albumId] === "close"
                            ? closeIcon
                            : openIcon
                        }
                        alt="open icon"
                        onClick={() => handleShowPhotos(album.albumId)}
                      />
                      <p>{album.title}</p>
                    </div>
                    <div className={styles.photos}>
                      {photosVisible[album.albumId] &&
                        album.photos?.map((photo) => (
                          <div key={photo.id} className={styles.photo}>
                            <img
                              src={photo.url}
                              alt={photo.title}
                              onClick={() => handleModal(photo)}
                            />
                            <div className={styles.img_title}>
                              {photo.title}
                            </div>
                            <div>
                              <img
                                src={
                                  favorites.some((fav) => fav.id === photo.id)
                                    ? favorite
                                    : notfavorite
                                }
                                alt="favorite"
                                className={styles.favorite}
                                onClick={() => handleFavorite(photo)}
                              />
                            </div>
                            <Modal
                              modalOpen={modalOpen}
                              selectedPhoto={selectedPhoto}
                              handleCloseModal={handleCloseModal}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Catalog;

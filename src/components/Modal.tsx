import { Photo } from "../types/types";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  modalOpen: boolean;
  selectedPhoto: Photo | null;
  handleCloseModal: () => void;
}

function Modal({ modalOpen, selectedPhoto, handleCloseModal }: ModalProps) {
  if (!modalOpen || !selectedPhoto) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={handleCloseModal}>
          &times;
        </span>
        <img src={selectedPhoto.url} alt={selectedPhoto.title} />
      </div>
    </div>
  );
}

export default Modal;

import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__item__image}
        onClick={toggleModal}
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} width="1000" />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

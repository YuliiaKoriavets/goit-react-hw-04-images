import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({webformatURL, largeImageURL, tags}) {
  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__item__image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

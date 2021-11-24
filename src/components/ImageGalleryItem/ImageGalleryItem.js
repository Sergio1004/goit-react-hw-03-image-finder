import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li className={s.galleryItem} onClick={onClick}>
      <img
        className={s.imageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

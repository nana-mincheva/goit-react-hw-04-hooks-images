import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";

export default function ImageGallery({ images, onItemClick, onClick }) {
  const handleOpenModal = (e) => {
    if (e.target !== e.currentTarget) {
      onClick();
    }
  };
  return (
    <ul className="ImageGallery" onClick={handleOpenModal}>
      {images &&
        images.map((image) => (
          <li key={image.id} className="ImageGalleryItem">
            <ImageGalleryItem {...image} onItemClick={onItemClick} />
          </li>
        ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
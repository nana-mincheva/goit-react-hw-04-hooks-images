import PropTypes from "prop-types";
import "./ImageGalleryItem.css";

export default function ImageGalleryItem({
  id,
  webformatURL,
  tags,
  onItemClick,
}) {
  const modalContent = (id) => {
    onItemClick(id);
  };

  return (
    <img
      src={webformatURL}
      alt={tags}
      className="ImageGalleryItem-image"
      onClick={() => modalContent(id)}
    />
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
import Button from "../Button/Button";
import PropTypes from "prop-types";

const FavPopup = ({ onClose, removeFavorite, comicTitle, isRemoveAll }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={handleOverlayClick}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button className="popup-close-btn" onClick={onClose}>
            X
          </button>

          <p className="popup-title">
            {isRemoveAll
              ? "Are you sure you want to remove all your favorite comics?"
              : `Are you sure you want to remove ${comicTitle} from your favorites?`}
          </p>

          <div className="popup-buttons">
            <Button
              text="Confirm"
              onClick={isRemoveAll ? removeFavorite : () => removeFavorite()}
            />
            <Button text="Close" onClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

FavPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  comicTitle: PropTypes.string,
  isRemoveAll: PropTypes.bool.isRequired, // Add this new prop
};

export default FavPopup;

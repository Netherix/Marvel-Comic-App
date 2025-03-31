import Button from "../Button/Button";
import PropTypes from "prop-types";

const FavPopup = ({ onClose, removeFavorite, comicTitle }) => {
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
            Are you sure you want to remove <u>{comicTitle}</u> from your favorites?
          </p>
          <div className="popup-buttons">
						<Button text="Confirm" onClick={removeFavorite} />
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
	comicTitle: PropTypes.string.isRequired
};

export default FavPopup;



import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Popup.css";
import Button from "../Button/Button";

const Popup = ({ character, onClose }) => {
  // Close when clicking outside the popup
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="popup-close-btn" onClick={onClose}>
          X
        </button>
        <p className="popup-title">
          How would you like to explore the character of {character.name}?
        </p>
        <div className="popup-buttons">
          {/* Learn More */}
          <Link to={`/learn-character/${character.id}`} state={{ character }}>
            <Button text="Learn More About This Character" />
          </Link>
          {/* Explore Comics */}
          <Link to={`/comics/${character.id}`} state={{ character }}>
            <Button text="Explore Comics By This Character" />
          </Link>
          <Button text="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Popup;

Popup.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired, // Fixed prop type
};

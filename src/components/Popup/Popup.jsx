import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Popup.css";
import Button from "../Button/Button";

const Popup = ({ characterName, characterId, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        {/* Close button */}
        <button className="popup-close-btn" onClick={onClose}>
          X
        </button>
        <p className="popup-title">How would you like to explore the character of {characterName}?</p>
        <div className="popup-buttons">
          {/* Learn More */}
          <Link to={`/comics/${characterId}`} state={{ characterName }}>
            <Button text='Learn More About This Character' />
          </Link>
          {/* Explore Comics */}
          <Link to={`/comics/${characterId}`} state={{ characterName }}>
            <Button text='Explore Comics By This Character' />
          </Link>
          <Button text="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Popup;

Popup.propTypes = {
  characterName: PropTypes.string.isRequired,
  characterId: PropTypes.number.isRequired,
  onClose: PropTypes.bool.isRequired,
};

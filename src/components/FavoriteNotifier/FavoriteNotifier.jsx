import PropTypes from "prop-types";
import { useEffect } from "react";
import "./FavoriteNotifier.css";

const FavoriteNotifier = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    isVisible && (
      <div className="favorite-message">
        <p>{message}</p>
      </div>
    )
  );
};

FavoriteNotifier.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default FavoriteNotifier;

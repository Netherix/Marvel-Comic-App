import './Nav.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">

      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Home/Explore</li>
        <li onClick={() => navigate('/favorite-comics')}>Favorite Comics</li>
        <li onClick={() => navigate('/')}>Favorite Characters</li>
        <li onClick={() => navigate('/')}>TBA</li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        <p>Show Menu</p>
      </div>

      {menuOpen && (
        <div className="popup-menu">
          <div className="popup-close" onClick={toggleMenu}>×</div>
          <ul className="popup-links">
            <li onClick={() => navigate('/')}>Home/Explore</li>
            <li onClick={() => navigate('/favorite-comics')}>Favorite Comics</li>
            <li onClick={() => navigate('/')}>Favorite Characters</li>
            <li onClick={() => navigate('/')}>TBA</li>
            <li onClick={toggleMenu}>Close</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

Nav.propTypes = {
  favoriteComics: PropTypes.arrayOf(PropTypes.object)
};

export default Nav;

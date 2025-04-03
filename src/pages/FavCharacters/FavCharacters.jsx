import "./FavCharacters.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import FavPopup from "../../components/FavPopup/FavPopup";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Button/Button";
import FavoriteNotifier from "../../components/FavoriteNotifier/FavoriteNotifier"; // Import FavoriteNotifier

const FavCharacters = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedCharacterName, setSelectedCharacterName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [isRemoveAllPopup, setIsRemoveAllPopup] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  });

  // Pagination variables
  const charactersPerPage = 8;
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const charactersToDisplay = favoriteCharacters.slice(startIndex, endIndex);

  useEffect(() => {
    const savedFavoriteCharacters = localStorage.getItem("favoriteCharacters");
    if (savedFavoriteCharacters) {
      const updatedFavoriteCharacters = JSON.parse(savedFavoriteCharacters);
      setFavoriteCharacters(updatedFavoriteCharacters);
      setTotalCharacters(updatedFavoriteCharacters.length);
    }
  }, []);

  const removeFavorite = (characterId, characterName) => {
    const updatedFavoriteCharacters = favoriteCharacters.filter(
      (character) => character.id !== characterId
    );
    setFavoriteCharacters(updatedFavoriteCharacters);
    setTotalCharacters(updatedFavoriteCharacters.length);
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(updatedFavoriteCharacters)
    );
    setIsPopupVisible(false);
    setNotification({
      message: `${characterName} removed from favorites!`,
      isVisible: true,
    });
  };

  const removeAllFavorites = () => {
    setIsRemoveAllPopup(true);
  };

  const confirmRemoveAllFavorites = () => {
    setFavoriteCharacters([]);
    setTotalCharacters(0);
    localStorage.setItem("favoriteCharacters", JSON.stringify([]));
    setIsRemoveAllPopup(false);
    setNotification({
      message: "All characters removed from favorites!",
      isVisible: true,
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsRemoveAllPopup(false);
  };

  const openPopup = (characterId, characterName) => {
    setIsPopupVisible(true);
    setSelectedCharacterId(characterId);
    setSelectedCharacterName(characterName);
  };

  // Function to hide notification
  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  return (
    <>
      <Nav />
      <div className="title-wrapper">
        <p className="character-explore-title">Your Favorite Characters!</p>
      </div>

      <Button
        text="Remove All Favorites"
        className="remove-all-btn"
        onClick={removeAllFavorites}
      />

      {/* FavoriteNotifier Component */}
      <FavoriteNotifier
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />

      {/* Character Card Section */}
      {favoriteCharacters.length > 0 ? (
        <div className="character-card-section">
          <ul className="character-card-container">
            {charactersToDisplay.length > 0
              ? charactersToDisplay.map((character) => (
                  <li key={character.id}>
                    <div className="character-card-inner">
                      <LazyLoad height={300} offset={100}>
                        <Link
                          to={`/learn-character/${character.id}`}
                          state={{ character }}
                        >
                          <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                          />
                        </Link>
                        {/* Heart Button */}
                        <div
                          className="heart-button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent Link click from triggering
                            openPopup(character.id, character.name);
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="red"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                        <p>
                          {character.name.length > 30
                            ? `${character.name.substring(0, 30)}...`
                            : character.name}
                        </p>
                      </LazyLoad>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <p className="no-favs-text">No favorite characters yet!</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Popup Window */}
      {isPopupVisible && (
        <FavPopup
          onClose={closePopup}
          removeFavorite={() =>
            removeFavorite(selectedCharacterId, selectedCharacterName)
          }
          comicTitle={selectedCharacterName}
        />
      )}

      {isRemoveAllPopup && (
        <FavPopup
          onClose={closePopup}
          removeFavorite={confirmRemoveAllFavorites}
          comicTitle=""
          isRemoveAll={true}
        />
      )}

      <Footer />
    </>
  );
};

export default FavCharacters;

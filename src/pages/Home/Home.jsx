import { useState, useEffect } from "react";
import {
  fetchCharacters,
  fetchRandomCharacter,
} from "../../api/MarvelAPI/fetchCharacters";
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Popup from "../../components/Popup/Popup";
import Pagination from "../../components/Pagination/Pagination";
import FavoriteNotifier from "../../components/FavoriteNotifier/FavoriteNotifier";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({
    randomSearch: false,
    getCharacterData: false,
  });
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    () => JSON.parse(localStorage.getItem("favoriteCharacters")) || []
  );
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  // pagination variables
  const charactersPerPage = 8;
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setIsLoading((prevState) => ({ ...prevState, getCharacterData: true }));
        const result = await fetchCharacters(
          searchTerm,
          currentPage,
          charactersPerPage
        );
        setCharacters(result.characters);
        setTotalCharacters(result.totalCharacters);
        setError(result.error);
        setIsLoading((prevState) => ({
          ...prevState,
          getCharacterData: false,
        }));
      }
    };
    fetchData();
  }, [searchTerm, currentPage]);

  const handleReset = () => {
    setSearchTerm("");
    setCharacters([]);
    setError(null);
    setCurrentPage(1);
    setTotalCharacters(0);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleRandomSearch = async () => {
    setIsLoading((prevState) => ({ ...prevState, randomSearch: true }));
    try {
      const randomCharacter = await fetchRandomCharacter();
      if (randomCharacter) {
        setSearchTerm(randomCharacter.name);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Random search failed:", error);
      setError("Failed to fetch random character. Please try again later.");
    }
    setIsLoading((prevState) => ({ ...prevState, randomSearch: false }));
  };

  const toggleFavorite = (character) => {
    const updatedFavorites = favoriteCharacters.some(
      (fav) => fav.id === character.id
    )
      ? favoriteCharacters.filter((fav) => fav.id !== character.id)
      : [...favoriteCharacters, character];

    setFavoriteCharacters(updatedFavorites);
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(updatedFavorites)
    );

    const message = updatedFavorites.some((fav) => fav.id === character.id)
      ? `${character.name} added to favorites!`
      : `${character.name} removed from favorites!`;
    setFavoriteMessage(message);
    setIsMessageVisible(true);
  };

  return (
    <>
      <Nav />

      <div className="wolverine-container">
        <img
          src="src/assets/wolverine.png"
          style={{ height: "300px", width: "300px" }}
          alt="Wolverine"
        />
        <p>Get Searching, Bub!</p>
      </div>

      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetSearch={handleReset}
        handleRandomSearch={handleRandomSearch}
        isLoading={isLoading}
      />

      {error && <p className="error-message">{error}</p>}

      <FavoriteNotifier
        message={favoriteMessage}
        isVisible={isMessageVisible}
        onHide={() => setIsMessageVisible(false)}
      />

      {/* character cards */}
      {characters.length > 0 && (
        <div className="character-card-section">
          <ul className="character-card-container">
            {characters.map((character) => (
              <li key={character.id}>
                <div onClick={() => handleCharacterClick(character)}>
                  <div className="character-card-inner">
                    <LazyLoad height={300} offset={100}>
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      <p>{character.name}</p>
                    </LazyLoad>
                    <div
                      className="heart-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(character);
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={
                          favoriteCharacters.some(
                            (fav) => fav.id === character.id
                          )
                            ? "red"
                            : "grey"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      {isPopupVisible && (
        <Popup
          characterName={selectedCharacter.name}
          onClose={closePopup}
          characterId={selectedCharacter.id}
          character={selectedCharacter}
        />
      )}

      <Footer />
    </>
  );
};

export default Home;

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

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState({
    randomSearch: false,
    getCharacterData: false,
  });

  // Pagination variables
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
  }, [searchTerm, currentPage]); // Ensure pagination works

  const handleReset = () => {
    setSearchTerm("");
    setCharacters([]);
    setError(null);
    setCurrentPage(1); // Reset pagination when clearing search
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
        setSearchTerm(randomCharacter.name); // Update searchTerm with random character name
        setCurrentPage(1); // Reset to first page when doing a random search
      }
    } catch (error) {
      console.error("Random search failed:", error);
      setError("Failed to fetch random character. Please try again later.");
    }
    setIsLoading((prevState) => ({ ...prevState, randomSearch: false }));
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination Controls */}
      {totalCharacters > charactersPerPage && (
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

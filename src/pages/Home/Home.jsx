import { useState, useEffect } from "react";
import { fetchCharacters, fetchRandomCharacter } from "../../api/MarvelAPI/fetchCharacters"; 
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Popup from "../../components/Popup/Popup"; 

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      fetchCharacters(searchTerm)
        .then(setCharacters)
        .catch(() => setError("Failed to fetch characters. Please try again later."));
    }
  }, [searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    setCharacters([]);
    setError(null);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <Nav />
      <div className="wolverine-container">
        <img src="src/assets/wolverine.png" style={{ height: "300px", width: "300px" }} alt="Wolverine" />
        <p>Get Searching, Bub!</p>
      </div>

      <span>
        <Search 
          setSearchTerm={setSearchTerm} 
          resetSearch={handleReset} 
          randomSearch={() => fetchRandomCharacter().then(setCharacters).catch(() => setError("Failed to fetch a random character."))} 
        />
      </span>

      {error && <p className="error-message">{error}</p>}

      {characters.length > 0 && (
        <div className="character-card-section">
          <ul className="character-card-container">
            {characters.map((character) => (
              <li key={character.id}>
                <div onClick={() => handleCharacterClick(character)}>
                  <div className="character-card-inner">
                    <LazyLoad offset={100}>
                      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                      <p>{character.name}</p>
                    </LazyLoad>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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

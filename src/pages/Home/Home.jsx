import { useState, useEffect } from "react";
import md5 from "md5"; // hash value function
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Popup from "../../components/Popup/Popup"; // Import the Popup component

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control the popup visibility
  const [selectedCharacter, setSelectedCharacter] = useState(null); // State to hold the selected character

  const fetchCharacters = async (searchTerm) => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    const timestamp = Date.now();
    const hash = md5(timestamp + privateKey + publicKey); // creates a unique hash value used for security purposes
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10&nameStartsWith=${searchTerm}`; // Add nameStartsWith to filter by search term

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.data.results);
      setError(null); 
    } catch (error) {
      setError("Failed to fetch characters. Please try again later.");
      console.error("Error fetching Marvel characters:", error);
    }
  };

  const fetchRandomCharacter = async () => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    const timestamp = Date.now();
    const hash = md5(timestamp + privateKey + publicKey);

    const totalCharacters = 1564;
    const randomOffset = Math.floor(Math.random() * totalCharacters);

    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=1&offset=${randomOffset}`; // Fetch 1 random character

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const randomCharacter = data.data.results[0];
      setCharacters([randomCharacter]);
      setError(null);
    } catch (error) {
      setError("Failed to fetch a random character. Please try again later.");
      console.error("Error fetching random Marvel character:", error);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCharacters([]);
    setError(null); // Clear error on reset
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsPopupVisible(true); // Show the popup when a character is clicked
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCharacters(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      {/* Navbar */}
      <Nav />

      {/* Wolverine picture & text */}
      <div className="wolverine-container">
        <img
          src="src/assets/wolverine.png"
          style={{ height: "300px", width: "300px" }}
          alt="Wolverine"
        />
        <p>Get Searching, Bub!</p>
      </div>

      <span>
        <Search 
          setSearchTerm={setSearchTerm} 
          resetSearch={handleReset} 
          randomSearch={fetchRandomCharacter} />
      </span>

      {/* Error message display */}
      {error && <p className="error-message">{error}</p>}

      {/* Wrapper for character cards */}
      {characters.length > 0 && (
        <div className="character-card-section">
          <ul className="character-card-container">
            {characters.map((character) => (
              <li key={character.id}>
                <div onClick={() => handleCharacterClick(character)}>
                  <div className="character-card-inner">
                    <LazyLoad offset={100}>
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

      {/* Display Popup if visible */}
      {isPopupVisible && (
        <Popup 
          characterName={selectedCharacter.name} 
          onClose={closePopup}
          characterId={selectedCharacter.id} 
          character={selectedCharacter}
        />
      )}

      {/* footer */}
      <Footer />
    </>
  );
};

export default Home;

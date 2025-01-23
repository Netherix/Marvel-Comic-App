import { useState, useEffect } from "react";
import md5 from "md5"; // hash value function
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import Nav from "../../components/Nav/Nav";
import "./Home.css";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State for error handling

  console.log(characters)

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
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Failed to fetch characters. Please try again later.");
      console.error("Error fetching Marvel characters:", error);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setCharacters([]);
    setError(null); // Clear error on reset
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCharacters(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
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
        <Search setSearchTerm={setSearchTerm} resetSearch={handleReset} />
      </span>

      {/* Error message display */}
      {error && <p className="error-message">{error}</p>}

      {/* Wrapper for character cards */}
      {characters.length > 0 && (
        <div className="character-card-section">
          <ul className="character-card-container">
            {characters.map((character) => (
              <li key={character.id}>
                <Link to={`/comics/${character.id}`}>
                  <div className="character-card-inner">
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      width="300"
                      height="300"
                    />
                    <p>{character.name}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Home;

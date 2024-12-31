import { useState, useEffect } from "react";
import md5 from "md5"; // hash value function
import Search from "../../components/Search/Search";
import "./Home.css";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const fetchCharacters = async (searchTerm) => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    const timestamp = Date.now();
    const hash = md5(timestamp + privateKey + publicKey); // creates an unique hash value used for security purposes
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10&nameStartsWith=${searchTerm}`; // Add nameStartsWith to filter by search term

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error("Error fetching Marvel characters:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCharacters(searchTerm);
    } else {
      fetchCharacters(""); // Default fetch when there's no search term
    }
  }, [searchTerm]); // Fetch characters whenever searchTerm changes

  return (
    <>
      <div className="search-bar">
        <Search setSearchTerm={setSearchTerm} />{" "}
        {/* Pass setSearchTerm to Search */}
      </div>

      {/* Wrapper for character cards */}
      <div className="character-card-section">
        <ul className="character-card-container">
          {characters.map((character) => (
            <li key={character.id}>
              <div className="character-card-inner">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  width="300"
                  height="300"
                />
                <p>{character.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;

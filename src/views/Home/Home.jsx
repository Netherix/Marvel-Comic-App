import { useState, useEffect } from 'react';
import md5 from 'md5'; // Import the md5 library

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_PRIVATE_KEY;
      const timestamp = Date.now();
      const hash = md5(timestamp + privateKey + publicKey);
      const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10`; // Limit to 10 characters for demonstration
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        console.error("Error fetching Marvel characters:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };
  
    fetchCharacters();
  }, []);
  

  return (
    <div>
      <h1>Marvel Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              width="100"
              height="100"
            />
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
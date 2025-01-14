import './ComicList.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import md5 from 'md5';

const ComicList = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchComics = async () => {
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_PRIVATE_KEY;
      const timestamp = Date.now();
      const hash = md5(timestamp + privateKey + publicKey);
      const url = `http://gateway.marvel.com/v1/public/comics?characters=${characterId}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComics(data.data.results); // Store comics data
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchComics();
  }, [characterId]);

  return (
    <div className="comics-list-container">
      {loading && <p>Loading comics...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && comics.length === 0 && <p>No comics available for this character.</p>}
      {!loading && !error && comics.length > 0 && (
        <ul className="comics-list">
          {comics.map((comic) => (
            <li key={comic.id} className="comic-item">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                width="150"
                height="225"
              />
              <h3>{comic.title}</h3>
              <p>{comic.description || 'No description available.'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComicList;

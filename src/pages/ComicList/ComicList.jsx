import "./ComicList.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import md5 from "md5";

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
        setComics(data.data.results);
        setError(null);
      } catch (error) {
        setError("Failed to fetch comics. Please try again later.");
        console.error("Error fetching comics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [characterId]);

  return (
    <>
      {/* loading notifier */}
      {loading && <p className="pre-load-text">Loading comics...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && comics.length === 0 && (
        <p className="pre-load-text">No comics available for this character.</p>
      )}

      {/* wrapper for comics */}
      {!loading && !error && comics.length > 0 && (
        <div className="comic-card-section">
          <ul className="comic-card-container">
            {comics.map((comic) => (
              <li key={comic.id}>
                <Link to={`/learn-comic/${comic.id}`} state={{ comic }}>
                  <div className="comic-card-inner">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      width="150"
                      height="225"
                    />
                    <p>
                      {comic.title.length > 30
                        ? `${comic.title.substring(0, 30)}...`
                        : `${comic.title}`}
                    </p>
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

export default ComicList;

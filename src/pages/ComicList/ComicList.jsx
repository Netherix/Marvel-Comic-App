import "./ComicList.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import md5 from "md5";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Pagination from "../../components/Pagination/Pagination";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalComics, setTotalComics] = useState(0); // Track total number of comics

  // react-router-dom variables
  const { characterId } = useParams();
  const location = useLocation();
  const { characterName } = location.state || {};

  // pagination variables
  const comicsPerPage = 8;
  const totalPages = Math.ceil(totalComics / comicsPerPage);

  useEffect(() => {
    const fetchComics = async () => {
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_PRIVATE_KEY;
      const timestamp = Date.now();
      const hash = md5(timestamp + privateKey + publicKey);
      const offset = (currentPage - 1) * comicsPerPage;
      const url = `http://gateway.marvel.com/v1/public/comics?characters=${characterId}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${comicsPerPage}&offset=${offset}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setComics(data.data.results);
        setTotalComics(data.data.total);
        setError(null);
      } catch (error) {
        setError("Failed to fetch comics. Please try again later.");
        console.error("Error fetching comics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [characterId, currentPage]); // Re-fetch comics when page changes

  return (
    <>
      {/* Navbar */}
      <Nav />

      {/* loading notifier */}
      {loading && <p className="pre-load-text">Loading comics...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && comics.length === 0 && (
        <p className="pre-load-text">No comics available for this character.</p>
      )}

      {!loading && !error && (
        <div className="title-wrapper">
          <p className="comic-explore-title">Explore {characterName} Comics!</p>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* wrapper for comics */}
      {!loading && !error && comics.length > 0 && (
        <div className="comic-card-section">
          <ul className="comic-card-container">
            {comics.map((comic) => (
              <li key={comic.id}>
                <Link to={`/learn-comic/${comic.id}`} state={{ comic }}>
                  <div className="comic-card-inner">
                    <LazyLoad offset={100}>
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                      <p>
                        {comic.title.length > 30
                          ? `${comic.title.substring(0, 30)}...`
                          : `${comic.title}`}
                      </p>
                    </LazyLoad>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ComicList;

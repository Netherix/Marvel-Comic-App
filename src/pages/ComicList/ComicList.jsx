import "./ComicList.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Pagination from "../../components/Pagination/Pagination";
import fetchComics from "../../api/MarvelAPI/fetchComics";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComics, setTotalComics] = useState(0);

  // Get character object from state
  const location = useLocation();
  const { character } = location.state || {};

  // Pagination variables
  const comicsPerPage = 8;
  const totalPages = Math.ceil(totalComics / comicsPerPage);

  useEffect(() => {
    const getComics = async () => {
      setLoading(true);
      if (!character) return;

      const result = await fetchComics(character.id, currentPage, comicsPerPage);
      setComics(result.comics);
      setTotalComics(result.totalComics);
      setError(result.error);
      setLoading(false);
    };

    getComics();
  }, [character, currentPage]);

  return (
    <>
      {/* Navbar */}
      <Nav />

      {/* Loading/Error States */}
      {loading && <p className="pre-load-text">Loading comics...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && comics.length === 0 && (
        <p className="pre-load-text">No comics available for this character.</p>
      )}

      {/* Title */}
      {!loading && !error && character && (
        <div className="title-wrapper">
          <p className="comic-explore-title">Explore {character.name} Comics!</p>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      {/* Comics List */}
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
                          : comic.title}
                      </p>
                    </LazyLoad>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ComicList;

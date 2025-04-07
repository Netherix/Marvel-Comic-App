import "./ComicList.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import LazyLoad from "react-lazyload";
import Pagination from "../../components/Pagination/Pagination";
import fetchComics from "../../api/MarvelAPI/fetchComics";
import FavoriteNotifier from "../../components/FavoriteNotifier/FavoriteNotifier";

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComics, setTotalComics] = useState(0);
  const [favoriteComics, setFavoriteComics] = useState(
    () => JSON.parse(localStorage.getItem("favoriteComics")) || []
  );

  const [notifierVisible, setNotifierVisible] = useState(false);
  const [notifierMessage, setNotifierMessage] = useState("");

  const location = useLocation();
  const { character } = location.state || {};
  const comicsPerPage = 8;
  const totalPages = Math.ceil(totalComics / comicsPerPage);

  useEffect(() => {
    if (!character) return;
    const getComics = async () => {
      setLoading(true);
      try {
        const result = await fetchComics(
          character.id,
          currentPage,
          comicsPerPage
        );
        setComics(result.comics);
        setTotalComics(result.totalComics);
      } catch (error) {
        setError("Failed to load comics. Please try again later.", error);
      } finally {
        setLoading(false);
      }
    };
    getComics();
  }, [character, currentPage]);

  const toggleFavorite = (comic) => {
    const isFavorite = favoriteComics.some((fav) => fav.id === comic.id);
    const updatedFavorites = isFavorite
      ? favoriteComics.filter((fav) => fav.id !== comic.id)
      : [...favoriteComics, comic];

    setFavoriteComics(updatedFavorites);
    localStorage.setItem("favoriteComics", JSON.stringify(updatedFavorites));

    setNotifierMessage(
      isFavorite
        ? `"${comic.title}" was removed from favorites.`
        : `"${comic.title}" was added to favorites!`
    );
    setNotifierVisible(true);
  };

  return (
    <>
      <Nav />

      {loading && <p className="pre-load-text">Loading comics...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && comics.length === 0 && (
        <p className="pre-load-text">No comics available for this character.</p>
      )}
      {!loading && !error && character && (
        <div className="title-wrapper">
          <p className="comic-explore-title">
            Explore comics that {character.name} appears in!
          </p>
        </div>
      )}

      <FavoriteNotifier
        message={notifierMessage}
        isVisible={notifierVisible}
        onHide={() => setNotifierVisible(false)}
      />
      {!loading && !error && comics.length > 0 && (
        <div className="comic-card-section">
          <ul className="comic-card-container">
            {comics.map((comic) => (
              <li key={comic.id}>
                <Link to={`/learn-comic/${comic.id}`} state={{ comic }}>
                  <div className="comic-card-inner">
                    <LazyLoad height={300} offset={100} once>
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                    </LazyLoad>
                    <div
                      className="heart-button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(comic);
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={
                          favoriteComics.some((fav) => fav.id === comic.id)
                            ? "red"
                            : "grey"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <p>
                      {comic.title.length > 30
                        ? `${comic.title.substring(0, 30)}...`
                        : comic.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      <Footer />
    </>
  );
};

export default ComicList;

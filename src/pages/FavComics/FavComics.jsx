import "./FavComics.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import FavPopup from "../../components/FavPopup/FavPopup";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Button/Button";

const FavComics = () => {
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedComicId, setSelectedComicId] = useState(null);
  const [selectedComicTitle, setSelectedComicTitle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComics, setTotalComics] = useState(0);
  const [isRemoveAllPopup, setIsRemoveAllPopup] = useState(false); // New state for remove all popup

  // pagination variables
  const comicsPerPage = 8;
  const totalPages = Math.ceil(totalComics / comicsPerPage);
  const startIndex = (currentPage - 1) * comicsPerPage;
  const endIndex = startIndex + comicsPerPage;
  const comicsToDisplay = favoriteComics.slice(startIndex, endIndex);

  useEffect(() => {
    const savedFavoriteComics = localStorage.getItem("favoriteComics");
    if (savedFavoriteComics) {
      const updatedFavoriteComics = JSON.parse(savedFavoriteComics);
      setFavoriteComics(updatedFavoriteComics);
      setTotalComics(updatedFavoriteComics.length);
    }
  }, []);

  const removeFavorite = (comicId) => {
    const updatedFavoriteComics = favoriteComics.filter(
      (comic) => comic.id !== comicId
    );
    setFavoriteComics(updatedFavoriteComics);
    setTotalComics(updatedFavoriteComics.length);
    localStorage.setItem(
      "favoriteComics",
      JSON.stringify(updatedFavoriteComics)
    );
    setIsPopupVisible(false);
  };

  const removeAllFavorites = () => {
    setIsRemoveAllPopup(true); // Trigger the "remove all" popup
  };

  const confirmRemoveAllFavorites = () => {
    setFavoriteComics([]);
    setTotalComics(0);
    localStorage.setItem("favoriteComics", JSON.stringify([]));
    setIsRemoveAllPopup(false);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsRemoveAllPopup(false); // Close both popups if either is active
  };

  const openPopup = (comicId, comicTitle) => {
    setIsPopupVisible(true);
    setSelectedComicId(comicId);
    setSelectedComicTitle(comicTitle);
  };

  return (
    <>
      <Nav />
      <div className="title-wrapper">
        <p className="comic-explore-title">Your Favorite Comics!</p>
      </div>

      <Button
        text="Remove All Favorites"
        className="remove-all-btn"
        onClick={removeAllFavorites}
      />

      {/* comic-card-section */}
      {favoriteComics.length > 0 ? (
        <div className="comic-card-section">
          <ul className="comic-card-container">
            {comicsToDisplay.length > 0 ? (
              comicsToDisplay.map((comic) => (
                <li key={comic.id}>
                  <div className="comic-card-inner">
                    <LazyLoad height={300} offset={100}>
                      <Link to={`/learn-comic/${comic.id}`} state={{ comic }}>
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={comic.title}
                        />
                        {/* Heart Button */}
                        <div
                          className="heart-button"
                          onClick={() => openPopup(comic.id, comic.title)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="red"
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
                      </Link>
                    </LazyLoad>
                  </div>
                </li>
              ))
            ) : null}
          </ul>
        </div>
      ) : (
        <p className="no-favs-text">No favorite comics yet!</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* popup window */}
      {isPopupVisible && (
        <FavPopup
          onClose={closePopup}
          removeFavorite={() => removeFavorite(selectedComicId)}
          comicTitle={selectedComicTitle}
        />
      )}

      {isRemoveAllPopup && (
        <FavPopup
          onClose={closePopup}
          removeFavorite={confirmRemoveAllFavorites}
          comicTitle=""
          isRemoveAll={true} // Pass the flag to indicate it's a remove all popup
        />
      )}

      <Footer />
    </>
  );
};

export default FavComics;

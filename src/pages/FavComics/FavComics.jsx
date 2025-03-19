import "./FavComics.css";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const FavComics = () => {
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    const savedFavoriteComics = localStorage.getItem("favoriteComics");
    if (savedFavoriteComics) {
      setFavoriteComics(JSON.parse(savedFavoriteComics));
    }
  }, []);

  const removeFavorite = (comicId) => {
    // Remove comic from favorites
    const updatedFavoriteComics = favoriteComics.filter(
      (comic) => comic.id !== comicId
    );
    setFavoriteComics(updatedFavoriteComics);
    localStorage.setItem(
      "favoriteComics",
      JSON.stringify(updatedFavoriteComics)
    );
  };

  return (
    <>
      <Nav />
      <div className="title-wrapper">
          <p className="comic-explore-title">
            Your Favorite Comics!
          </p>
        </div>

      {/* comic-card-section */}
      {favoriteComics.length > 0 ? (
        <div className="comic-card-section">
          <ul className="comic-card-container">
            {favoriteComics.length > 0 ? (
              favoriteComics.map((comic) => (
                <li key={comic.id}>
                  <div className="comic-card-inner">
                    <LazyLoad height={300} offset={100}>
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                      {/* Heart Button to remove favorite */}
                      <div
                        className="heart-button"
                        onClick={() => removeFavorite(comic.id)}
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
                    </LazyLoad>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <p>No favorite comics yet!</p>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <p>{favoriteComics.length === 0 ? "No favorite comics yet!" : null}</p>
      )}

      <Footer />
    </>
  );
};

export default FavComics;

// TO DO:
// pop window asking to remove favorite
// pagination (only showing up if more than 8)
// links to individual comics
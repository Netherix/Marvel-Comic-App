import './FavComics.css';
import { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const FavComics = () => {
  const [favoriteComics, setFavoriteComics] = useState([]);

  console.log(favoriteComics)

  useEffect(() => {
    // Load favorite comics from localStorage
    const savedFavoriteComics = localStorage.getItem('favoriteComics');
    if (savedFavoriteComics) {
      setFavoriteComics(JSON.parse(savedFavoriteComics));
    }
  }, []);

  return (
    <>
      <Nav />
      <p>Your Favorite Comics</p>
      {favoriteComics.length > 0 ? (
        favoriteComics.map((comic, index) => (
          <img
            key={index}
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
        ))
      ) : (
        <p>No favorite comics yet!</p>
      )}
      <Footer />
    </>
  );
};

export default FavComics;

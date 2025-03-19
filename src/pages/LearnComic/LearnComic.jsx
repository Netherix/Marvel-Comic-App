import { useLocation } from "react-router-dom";
import "./LearnComic.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const LearnComic = () => {
  
  const location = useLocation();
  const { comic } = location.state || {};

  // Get the URL to the Marvel website for this comic
  const comicUrl = comic.urls.find((url) => url.type === "detail")?.url;

  console.log(comic);

  return (
    <>
      {/* Navbar */}
      <Nav />
      
      <div className="comic-info-container">
        {/* title and series */}
        <div className="title-series-image-container">
          <div className="title-series-container">
            <p className="comic-title">{comic.title}</p>
            {comic.series && <p className="comic-series">Series: {comic.series.name}</p>}
          </div>

          <hr className="separator-line" />

          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            height="500"
          />
        </div>

        <div className="comic-description">
          <p>{comic.description || "No description available."}</p>
        </div>

        <div className="characters-creators-container">
          {/* characters featured in the comic */}
          {comic.characters.items.length > 0 && (
            <div className="characters">
              <p>Characters:</p>
              <ul>
                {comic.characters.items.map((character, index) => (
                  <li key={index}>{character.name}</li>
                ))}
              </ul>
            </div>
          )}
          <hr className="separator-line2"/>
          {/* creators of the comic */}
          {comic.creators.items.length > 0 && (
            <div className="creators">
              <p>Creators:</p>
              <ul>
                {comic.creators.items.map((creator, index) => (
                  <li key={index}>
                    {creator.name} - {creator.role}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Link to Marvel's website */}
        {comicUrl && (
          <a href={comicUrl} target="_blank" rel="noopener noreferrer">
            Click Here To View This Comic On Marvel&apos;s Website!
          </a>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LearnComic;

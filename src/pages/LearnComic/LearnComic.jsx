import { useLocation } from "react-router-dom";
import "./LearnComic.css";

const LearnComic = () => {
  const location = useLocation();
  const { comic } = location.state || {};

  return (
    <>
      <div className="comic-info-section">
        <div className="comic-info-container">
          <p>{comic.title}</p>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            height="500"
          />
          <p>{comic.description}</p>
        </div>
      </div>
    </>
  );
};

export default LearnComic;

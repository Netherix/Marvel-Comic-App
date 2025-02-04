import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { fetchRandomCharacter } from "../../api/MarvelAPI/fetchCharacters"; // Import random fetch function
import "./Search.css";

const Search = ({ setSearchTerm, resetSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchTerm(inputValue.trim());
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
    resetSearch();
  };

  const handleRandomSearch = async () => {
    setIsLoading(true);
    try {
      const randomCharacter = await fetchRandomCharacter();
      if (randomCharacter) {
        setSearchTerm(randomCharacter.name);
        setInputValue(randomCharacter.name); // Display in input field
      }
    } catch (error) {
      console.error("Random search failed:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter character name!"
          className="search-bar"
        />
        <div className="search-buttons">
          <Button text="Get Character Data" onClick={handleSubmit} />
          <Button text="Reset" onClick={handleReset} />
          <Button 
            text={isLoading ? "Loading..." : "Randomizer"} 
            onClick={handleRandomSearch} 
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

export default Search;

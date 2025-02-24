import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Search.css";

const Search = ({ searchTerm, setSearchTerm, resetSearch, handleRandomSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm); // Update inputValue whenever searchTerm changes
  }, [searchTerm]);

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
          <Button
            text={isLoading.getCharacterData ? "Loading..." : "Get Character Data"}
            onClick={handleSubmit}
          />
          <Button text="Reset" onClick={handleReset} />
          <Button
            text={isLoading.randomSearch ? "Loading..." : "Randomizer"}
            onClick={handleRandomSearch}
            disabled={isLoading.randomSearch}
          />
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired, // Add searchTerm prop
  setSearchTerm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleRandomSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.object.isRequired,
};

export default Search;

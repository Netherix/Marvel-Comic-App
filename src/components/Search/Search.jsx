import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import './Search.css';

const Search = ({ setSearchTerm, resetSearch, randomSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Trigger the passed submit function
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
    resetSearch();
  };

  return (
    <>
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
            <Button text="Get Character Data" />
            <Button text="Reset" onClick={handleReset} />
            <Button text="Randomizer" onClick={randomSearch} />
          </div>
        </form>
      </div>
    </>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  randomSearch: PropTypes.func.isRequired,
};

export default Search;

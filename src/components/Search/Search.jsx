import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import './Search.css'

const Search = ({ setSearchTerm }) => {
  // Receive setSearchTerm as a prop
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Update the search term when the form is submitted
  };

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update input value on change
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
            <Button text="Reset" />
          </div>
        </form>
      </div>
    </>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search;

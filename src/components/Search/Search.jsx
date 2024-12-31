import { useState } from 'react';
import PropTypes from 'prop-types'

const Search = ({ setSearchTerm }) => { // Receive setSearchTerm as a prop
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue); // Update the search term when the form is submitted
  };

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update input value on change
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired
}

export default Search;

import { useState } from 'react';
import PropTypes from 'prop-types'
import Button from '../Button/Button';

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
          placeholder='Enter your character name!'
        />
        <Button text="Search"/>
      </form>
    </>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired
}

export default Search;

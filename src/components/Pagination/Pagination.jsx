import "./Pagination.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setInputPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    setInputPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (event) => {
    const value = event.target.value;
    setInputPage(value);

    const pageNumber = Number(value);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="navigation-buttons"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <label className="page-selector-container">
        Page 
        <select
          className="pagination-dropdown"
          value={inputPage}
          onChange={handlePageChange}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        of {totalPages}
      </label>

      <button
        className="navigation-buttons"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

import './Pagination.css'
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
};

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
};

  return (
    <div className='pagination-container'>
      <button onClick={() => setCurrentPage(handlePreviousPage)} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentPage(handleNextPage)} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired
}

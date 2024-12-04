import React from "react";

const Pagination = ({ totalRecords, page, setPage }) => {
  const totalPages = Math.ceil(totalRecords / 5);

  return (
    <div
      className="pagination"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-disabled={page === 1}
        aria-label="Previous Page"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        aria-disabled={page === Math.ceil(totalRecords / 5)}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

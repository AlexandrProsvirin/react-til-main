import React from 'react';
import './Pagination.css';

const Pagination = ({ pagesArray, changePage, currentPage }) => {
    return (
        <div className="pagination">
            {pagesArray.map(p =>
                <button
                    className={`pagination-button ${p === currentPage ? "active" : ""}`}
                    key={p}
                    onClick={() => changePage(p)}
                    disabled={p === currentPage}
                >
                    {p}
                </button>
            )}
        </div>
    );
};

export default Pagination;

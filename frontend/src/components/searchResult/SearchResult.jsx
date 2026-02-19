import React from 'react';
import './searchResult.css';

const SearchResult = ({ results, setShowResults }) => {
  return (
    <div className="search-dropdown">

      {/* 🔥 Close Button */}
      <div className="close-btn" onClick={() => setShowResults(false)}>
        ✖
      </div>

      {results.length > 0 ? (
        results.map((item) => (
          <div key={item._id} className="search-item">
            {item.name}
          </div>
        ))
      ) : (
        <div className="search-item no-results">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchResult;

// src/components/reusable/SearchResults.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

const SearchResults = ({ results = [], onSelect }) => (
  <div className="search-results-container">
    {results.map(({ id, title, artist, albumUrl }) => (
      <div key={id} className="search-result" onClick={() => onSelect({ id, title, artist, albumUrl })}>
        <img src={albumUrl} alt={title} className="search-result__image" />
        <div className="search-result__info">
          <span className="search-result__title">{title}</span>
          <span className="search-result__artist">{artist}</span>
        </div>
      </div>
    ))}
  </div>
);
SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    albumUrl: PropTypes.string.isRequired,
  })),
  onSelect: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  results: [],
};

export default SearchResults;

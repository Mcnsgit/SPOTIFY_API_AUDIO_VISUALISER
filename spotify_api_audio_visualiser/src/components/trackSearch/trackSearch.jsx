import React from 'react';
import { useDispatch } from 'react-redux';
import withUiActions from '../../hoc/uiHoc';
import { fetchSearchData } from '../../redux/actions/searchActions';

const containerStyle = {
  position: 'relative',
  top: '15px'
};

const inputStyle = {
  background: '#fff',
  width: 120,
  borderRadius: 10,
  border: 'none',
  fontFamily: "'Proxima Nova', Georgia, sans-serif",
  padding: '4px 4px 4px 10px',
  outline: 'none',
  marginTop: -2
};
const Search = ({ onSearch }) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(fetchSearchData(event.target.value));
  };

  return (
    <div className="track-search-container" style={containerStyle}>
      <form>
        <input
          type="text"
          placeholder="Search..."
          style={inputStyle}
          onChange={handleInputChange}
          onClick={onSearch}
        />
      </form>
    </div>
  );
};

export default withUiActions(Search);
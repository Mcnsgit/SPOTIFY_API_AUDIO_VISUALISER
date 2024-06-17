// Rewritten code to fix performance issues
import React from 'react';
import { useSelector } from 'react-redux';
import Search from '../trackSearch/trackSearch';
import PropTypes from 'prop-types';
import UserProfile from '../userProfile/UserProfile';
import './Header.scss';

const Header = ({ searchValue, onSearchChange, results, onSelect, userProfile }) => {
  const userProfileData = useSelector(state => state.auth || {});
  return (
    <div className="main-header">
      <Search value={searchValue} onChange={onSearchChange}/>
      <div className="user-profile">
        <UserProfile userProfile={userProfileData} />
      </div>
    </div>
  );
}

Header.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(Header);
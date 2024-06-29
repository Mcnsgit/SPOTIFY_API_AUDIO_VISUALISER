// src/components/SideMenu/trackCover/trackCover.jsx
import React from 'react';
import PropTypes from 'prop-types';
import withPlayer from '../../../../hoc/playerHoc';

const TrackCover = ({ currentSong }) => {
  if (!currentSong || !currentSong.album || !currentSong.album.images) {
    return null;
  }

  return (
    <div className="cover">
      <img
        alt="cover"
        src={currentSong.album.images[2]?.url}
        style={{ width: '100%' }}
      />
    </div>
  );
};

TrackCover.propTypes = {
  currentSong: PropTypes.shape({
    album: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string
        })
      )
    })
  }).isRequired
};

export default withPlayer(TrackCover);

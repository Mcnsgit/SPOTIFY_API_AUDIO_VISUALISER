import React from 'react';

import withPlayer from '../../hoc/playerHoc';

const trackCover = props => {
  return props.currentTrack.album ? (
    <div className="cover">
      <img
        alt="cover"
        src={
          props.currentTrack.album ? props.currentTrack.album.images[2].url : ''
        }
        style={{ width: '100%' }}
      />
    </div>
  ) : null;
};

export default withPlayer(trackCover);

import React from 'react';

import Generic from '../../../sections/top/generic';
import TrackSearch from './tracksSearch';
const allResults = props => {
  let type;
  switch (true) {
    case props.type === 'Artists':
      type = 'artist';
      break;
    case props.type === 'Albums':
      type = 'album';
      break;
    case props.type === 'Playlists':
      type = 'playlist';
      break;
    default:
      type = 'track';
      break;
  }

  return (
    <div className="all-results">
      <h2>
        Showing {props.type} for "{props.query}"
      </h2>
      {type === 'track' ? (
        <TrackSearch query={props.query} />
      ) : (
        <Generic type={type} url={`/search?q=${props.query}&type=${type}`} />
      )}
    </div>
  );
};

export default allResults;

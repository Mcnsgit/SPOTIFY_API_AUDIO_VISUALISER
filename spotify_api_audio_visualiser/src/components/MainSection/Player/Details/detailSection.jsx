import React from 'react';
import '../Player.scss'; 
import withUiActions from '../../../../hoc/uiHoc';
import withStatus from '../../../../hoc/statusHoc';
const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: '#aaa',
  fontSize: 12
};

const DetailSection = ({
  currentTrack,
  onAlbumClick,
  onArtistClick,
  contains,
  addTrack,
  removeTrack
}) => {
  if (!currentTrack) 
    return null;

const { name, album, artists = [], id } = currentTrack; // Default artists to an empty array if undefined


return (
  <div className="details-section">
    <div className="add-remove-section">
      <p
        onClick={() => album && onAlbumClick(album)}
        className={`track-name ${name && name.length > 30 ? 'overflow' : ''}`}
      >
        {name || 'Unknown Track'}
      </p>
      {contains ? (
        <i
          className="fa fa-check"
          aria-hidden="true"
          onClick={() => removeTrack(id, true)}
        />
      ) : (
        <i
          className="fa fa-plus"
          aria-hidden="true"
          onClick={() => addTrack(id, true)}
        />
      )}
    </div>
    <div className="artist-name" style={artistName}>
      {artists.map((artist, i) => (
        <span key={i}>
          <span
            className="artist"
            onClick={() => artist && onArtistClick(artist.uri.split(':')[2])}
          >
            {artist.name}
          </span>
          {i + 1 !== artists.length ? ', ' : ''}
        </span>
      ))}
    </div>
  </div>
);
}

export default withUiActions(withStatus(DetailSection));
import React from 'react';
import './detailsSection.scss'; 
import withUiActions from '../../../../hoc/uiHoc';
import withPlayer from '../../../../hoc/playerHoc';
import TrackCover from '../../../Layout/SideMenu/trackCover/trackCover';
import withStatus from '../../../../hoc/statusHoc';
const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: '#aaa',
  fontSize: 12
};
import '../Player.scss'


const DetailSection = ({ currentTrack }) => {
  if (!currentTrack) return null;

  const { name, album, artists = [] } = currentTrack;

  return (
    <div className="details-section">
      <TrackCover album={album} />
      <div className="track-info">
        <div className="track-name">{name}</div>
        <div className="artist-name">
          {artists.map((artist) => artist.name).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
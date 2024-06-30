// // src/components/SideMenu/trackCover/trackCover.jsx
// import React from 'react';
// import PropTypes from 'prop-types';
// import PlayerHoc from '../../../../hoc/playerHoc';

// const TrackCover = ({ currentTrack }) => {
//   if (!currentTrack || !currentTrack.album || !currentTrack.album.images || currentTrack.album.images.length < 3) {
//     return null;
//   }

//   const coverUrl = currentTrack.album.images[2].url;

//   return (
//     <div className="cover">
//       <img
//         alt="cover"
//         src={coverUrl}
//         style={{ width: '100%' }}
//       />
//     </div>
//   );
// };

// TrackCover.propTypes = {
//   currentTrack: PropTypes.shape({
//     album: PropTypes.shape({
//       images: PropTypes.arrayOf(
//         PropTypes.shape({
//           url: PropTypes.string
//         })
//       )
//     })
//   }).isRequired
// };

// export default PlayerHoc(TrackCover);
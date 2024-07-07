import React from 'react';
import './detailsSection.scss'; 
import withUiActions from '../../../../hoc/uiHoc';
import withStatus from '../../../../hoc/statusHoc';
import withPlayer from '../../../../hoc/playerHoc';
import TrackCover from '../../../Layout/SideMenu/trackCover/trackCover';
// const artistName = {
//   fontFamily: "'Proxima Thin', Georgia, sans-serif",
//   color: '#aaa',
//   fontSize: 12
// };
import '../Player.scss'
import { BsMusicNoteBeamed } from 'react-icons/bs';

const DetailSection = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }) => {
  if (currentTrack || !currentTrack.album) {
    return <div>Track information is not available.</div>;
  }



  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const getSmallestAlbumImage = (images) => {
    if (!images || images.length === 0) return '';
    return images.reduce((smallest, image) => image.height < smallest.height ? image : smallest, images[0]).url;
  };

  const albumImageUrl = currentTrack.album.images ? getSmallestAlbumImage(currentTrack.album.images) : '';

  return (
    <div>
      <audio
        src={currentTrack.preview_url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {albumImageUrl ? (
            <img src={albumImageUrl} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.name}</p>
          <p>{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
      <p className={'track-name' + (currentTrack.name.length > 30 ? ' overflow' : '')}>
        {currentTrack.name}
      </p>
    </div>
  );
};
export default withUiActions(withStatus(DetailSection));

// // src/components/main/Player/Details/detailSection.jsx
// import React from 'react';
// import './detailsSection.scss';
// import { BsMusicNoteBeamed } from 'react-icons/bs';

// const DetailSection = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }) => {
//   if (!currentTrack || !currentTrack.album) {
//     return <div>Track information is not available.</div>;
//   }

//   const onLoadedMetadata = () => {
//     const seconds = audioRef.current.duration;
//     setDuration(seconds);
//     progressBarRef.current.max = seconds;
//   };

//   const getSmallestAlbumImage = (images) => {
//     if (!images || images.url.length === 0) return '';
//     return images.reduce((smallest, image) => image.height < smallest.height ? image : smallest, images[0]).url;
//   };

//   const albumImageUrl = currentTrack.album.images ? getSmallestAlbumImage(currentTrack.album.images) : '';

//   return (
//     <div>
//       <audio
//         src={currentTrack.src}
//         ref={audioRef}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={handleNext}
//       />
//       <div className="audio-info">
//         <div className="audio-image">
//           {currentTrack.album.images ? (
//             <img src={albumImageUrl} alt="audio avatar" />
//           ) : (
//             <div className="icon-wrapper">
//               <span className="audio-icon">
//                 <BsMusicNoteBeamed />
//               </span>
//             </div>
//           )}
//         </div>
//         <div className="text">
//           <p className="title">{currentTrack.title}</p>
//           <p>{currentTrack.artist}</p>
//         </div>
//       </div>
//       <p
//         onClick={() => currentTrack.onAlbumClick(currentTrack.album)}
//         className={'track-name' + (currentTrack.trackName.length > 30 ? ' overflow' : '')}
//       >
//         {currentTrack.trackName}
//       </p>
//       {currentTrack.contains ? (
//         <i
//           className="fa fa-check"
//           aria-hidden="true"
//           onClick={() => currentTrack.removeTrack(currentTrack.ids, true)}
//         />
//       ) : (
//         <i
//           className="fa fa-plus"
//           aria-hidden="true"
//           onClick={() => currentTrack.addTrack(currentTrack.ids, true)}
//         />
//       )}
//     </div>
//   );
// };

// export default DetailSection;


// import React, { useState, useEffect } from 'react';
// import axios from '../../../../utils/axios';
// import styled from 'styled-components';
// import {
//   IoMdVolumeHigh,
//   IoMdVolumeOff,
//   IoMdVolumeLow,
// } from 'react-icons/io';
// // import './VolumeControls.scss';
// const VolumeContainer = styled.div`
//   display: flex;
//   align-items: center;
//   input[type='range'] {
//     width: 100px;
//     background: #1db954;
//     border-radius: 4px;
//     appearance: none;
//     outline: none;
//     &::-webkit-slider-thumb {
//       appearance: none;
//       width: 12px;
//       height: 12px;
//       background: #fff;
//       border-radius: 50%;
//       cursor: pointer;
//     }
//     &::-moz-range-thumb {
//       width: 12px;
//       height: 12px;
//       background: #fff;
//       border-radius: 50%;
//       cursor: pointer;
//     }
//   }
// `;

// const VolumeControl = ({ audioRef }) => {
//   const [volume, setVolume] = useState(100); // default volume is 100%
//   const [muteVolume, setMuteVolume] = useState(false);

//   const handleVolumeChange = (e) => {
//     const newVolume = parseInt(e.target.value, 10);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume / 100;
//       axios.put(`/me/player/volume?volume_percent=${newVolume}`);
//     }
//   };

//   const handleMuteToggle = () => {
//     setMuteVolume((prev) => !prev);
//     if (audioRef.current) {
//       audioRef.current.muted = !audioRef.current.muted;

//     }
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume / 100;
//       audioRef.current.muted = muteVolume;
//     }
//   }, [volume, muteVolume]);

//   return (
//     <VolumeContainer>
//       <div className="volume">
//         <button onClick={handleMuteToggle}>
//           {muteVolume || volume < 5 ? (
//             <IoMdVolumeOff />
//           ) : volume < 40 ? (
//             <IoMdVolumeLow />
//           ) : (
//             <IoMdVolumeHigh />
//           )}
//         </button>
//         <input
//           type="range"
//           min={0}
//           max={100}
//           value={volume}
//           onChange={handleVolumeChange}
//           style={{
//             background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
//           }}
//         />
//       </div>
//     </VolumeContainer>
//   );
// };

// export default VolumeControl;

// src/components/main/Player/volume/Volume.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  input[type='range'] {
    width: 100px;
    background: #1db954;
    border-radius: 4px;
    appearance: none;
    outline: none;
    &::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const VolumeControl = ({ spotifyPlayer }) => {
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (spotifyPlayer) {
      spotifyPlayer.getVolume().then(vol => {
        setVolume(vol * 100);
      });
    }
  }, [spotifyPlayer]);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (spotifyPlayer) {
      spotifyPlayer.setVolume(newVolume / 100);
    }
  };

  const toggleMute = () => {
    if (spotifyPlayer) {
      if (muted) {
        spotifyPlayer.setVolume(volume / 100);
      } else {
        spotifyPlayer.setVolume(0);
      }
      setMuted(!muted);
    }
  };

  return (
    <VolumeContainer>
      <div className="volume">
        <button onClick={toggleMute}>
          {muted || volume === 0 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
        />
      </div>
    </VolumeContainer>
  );
};

export default VolumeControl;


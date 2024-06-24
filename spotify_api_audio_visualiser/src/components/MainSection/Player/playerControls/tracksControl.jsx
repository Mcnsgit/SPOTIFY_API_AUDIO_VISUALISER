import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../Player.scss';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoShuffle,
  IoRepeat
} from 'react-icons/io5';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';


const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimePogress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  playTrack,
  pauseTrack,
  playing,
  shuffle,
  repeatContext,
  shuffleActive,
}) => {
  const [repeatMode, setRepeatMode] = useState('no-repeat'); // 'no-repeat', 'repeat-one', 'repeat-all'
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const playAnimationRef = useRef();

  const updateProgress = useCallback(() => {
    if (audioRef?.current) {
      const currentTime = audioRef.current.currentTime;
      setTimePogress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [audioRef, duration, progressBarRef, setTimePogress]);

  useEffect(() => {
    if (playing) {
      audioRef?.current?.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef?.current?.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [playing, audioRef, updateProgress]);

  const togglePlayPause = () => {
    if (playing) {
      pauseTrack();
    } else {
      playTrack();
    }
  };
  const skipForward = () => {
    if (audioRef?.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef?.current) {
      audioRef.current.currentTime -= 15;
    }
  };

const handlePrevious = () => {
  if (trackIndex === 0) {
    const lastTrackIndex = tracks.length - 1;
    setTrackIndex(lastTrackIndex);
    setCurrentTrack(tracks[lastTrackIndex]); 
  } else {
    setTrackIndex((prev) => prev - 1);
    setCurrentTrack(tracks[trackIndex - 1]);
  }
};

const handleNext = () => {
  if (trackIndex >= tracks.length - 1) {
    setTrackIndex(0);
    setCurrentTrack(tracks[0]);
  } else {
    setTrackIndex((prev) => prev + 1);
    setCurrentTrack(tracks[trackIndex + 1]);
  }
};

const handleVolumeChange = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const newVolume = (e.clientX - rect.left) / rect.width;
  setVolume(newVolume);
  if (audioRef?.current) {
    audioRef.current.volume = newVolume;
  }
};
  

useEffect(() => {
  if(audioRef?.current){ 
    audioRef.current.volume = volume / 100;
    audioRef.current.muted = muteVolume;
  }
},[volume,audioRef,muteVolume]);

// const shuffle = () => {
//   const s = props.trackList.tracks.slice();
//   let j, i = s.length - 1;
//   for (i; i > 0; i -= 1) {
//     j = Math.floor(Math.random() * (i + 1));
//     [s[i], s[j]] = [s[j], s[i]];
//   }
//   setShuffledTracks(s); 
//   };        
const shuffleTracks = () => {
  shuffle(!shuffleActive);
};

const handleRepeatMode = () => {
  if (repeatMode === 'no-repeat') {
    setRepeatMode('repeat-one');
    repeatContext('track');
  } else if (repeatMode === 'repeat-one') {
    setRepeatMode('repeat-all');
    repeatContext('context');
  } else {
    setRepeatMode('no-repeat');
    repeatContext('off');
  }
};

  // const playNextTrack = () => {
  //   if (repeatMode === 'repeat-one') {
  //     // Repeat the same track
  //     audioRef.current.currentTime = 0;
  //     audioRef.current.play();
  //   } else {
  //     // Play the next track
  //     const nextIndex = (trackIndex + 1) % tracks.length;
  //     setTrackIndex(nextIndex);
  //     setCurrentTrack(tracks[nextIndex]);
  //   }
  // };

  // useEffect(() => {
  //   const handleTrackEnd = () => {
  //     if (repeatMode === 'repeat-all') {
  //       playNextTrack();
  //     } else if (repeatMode === 'repeat-one') {
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play();
  //     } else {
  //       handleNext();
  //     }
  //   };
  //   audioRef.current.addEventListener('ended', handleTrackEnd);
  //   return () => {
  //     audioRef.current.removeEventListener('ended', handleTrackEnd);
  //   };
  // }, [audioRef, repeatMode, trackIndex, tracks, handleNext, playNextTrack]);

   
  return (
    <div className="controls-wrapper">
      <div className="track-controls">
        <button onClick={handlePrevious} className="control-button">
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward} className="control-button">
          <IoPlayBackSharp />
        </button>
        <button onClick={togglePlayPause} className="control-button">
          {playing ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward} className="control-button">
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext} className="control-button">
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className='extra-controls'>
        <div className="volume-control">
          <button onClick={() => setMuteVolume((prev) => !prev)} className="control-volume">
            {muteVolume || volume < 5 ? (
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
            value={volume}
            onChange={handleVolumeChange}
            style={{
              background: `linear-gradient(to right, #e91e63 ${volume}%, #333 ${volume}%)`
            }}
          />
        </div>
        <div className='repeat-shuffle'>
          <button onClick={shuffleTracks} className={`control-shuffle ${shuffleActive ? 'active' : ''}`}>
            <IoShuffle />
          </button>
          <button onClick={handleRepeatMode} className={`control-repeat ${repeatMode !== 'no-repeat' ? 'active' : ''}`}>
            {repeatMode === 'no-repeat' && <IoRepeat className='no-repeat' />}
            {repeatMode === 'repeat-one' && <IoRepeat className="repeat-one" />}
            {repeatMode === 'repeat-all' && <IoRepeat className="repeat-all" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
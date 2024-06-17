import React, { useRef, useState } from 'react';
import './Player.scss'
import './Controls/SongControls.css'
import ReactPlayer from 'react-player';
import ProgressBar from './Controls/songSider';
import DetailSection from './Details/detailSection';
import SongsControl from './playerControls/songsControl';
import VolumeControl from './volume/Volume';
import withPlayer from '../../hoc/playerHoc';





const CustomPlayer = ({ url, currentSong, contains }) => {
    const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);
  
    const handleSeek = (seekTime) => {
        if (playerRef.current) {
          playerRef.current.seekTo(seekTime);
        }
      };
    return (
        <div className="custom-player">
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={true}
                width="100%"
                height="50px"
            />
            <ProgressBar 
            {...{ProgressBarRef, auidoRef, timeProgress, duration }} player={playerRef.current} onSeek={handleSeek} />
            {currentSong.id && (
                <DetailSection
                    ids={
                        currentSong.linked_from?.id
                            ? `${currentSong.linked_from.id},${currentSong.id}`
                            : currentSong.id
                    }
                    contains={contains}
                    songName={currentSong.name || ''}
                    album={currentSong.album.uri.split(':')[2]}
                    artists={currentSong.artists || []}
                />
            )}
            <SongsControl currentSong={currentSong} />
            <VolumeControl 
            player={playerRef.current}
            onVolumeChange={(volume) => playerRef.current.setVolume(volume)}
            />
        </div>
    );
};


export default withPlayer(CustomPlayer);
import React, {Component} from 'react';
import './Player.scss'
import DetailSection from './Details/detailSection';
import SongSider from './Controls/songSider';
import SongsControl from './Controls/controlButon';
import VolumeControl from './volume/Volume';
import withPlayer from '../../hoc/playerHoc';


class Player extends Component {
    toSeconds = (ms) => ms / 1000;
    render = () => {
        const position = this.toSeconds(this.props.trackPosition) || 0;
        const duration = this.props.currentSong
          ? this.toSeconds(this.props.currentSong.duration_ms)
          : 1;
  
    // const handleSeek = (time) => {
    //     if (onSeek) {
    //         onSeek(time);
    //     }
    // };
  
    return (
        <div className="player-container">
            {this.props.currentSong.id ? (
                <DetailSection
                    ids={
                        this.props.currentSong.linked_from?.id
                            ? `${this.props.currentSong.linked_from.id},${this.props.currentSong.id}`
                            : this.props.currentSong.id
                    }
                    contains={this.props.contains}  
                    songName={this.props.currentSong.name || ''}
                    album={this.props.currentSong.album.uri.split(':')[2]}
                    artists={this.props.currentSong.artists || []}
                />
            ) : null}
            <SongsControl {...this.props} />
            <SongSider
                isEnabled
                value={position / duration}
                position={position}
                duration={duration}
                onChange={(value) => seekSong(Math.round(value * duration * 1000))}
            />
            <VolumeControl />
        </div>
    );
  };
}
  export default withPlayer(Player);
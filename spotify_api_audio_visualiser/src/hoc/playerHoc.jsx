import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { containsCurrentTrack, fetchTracks } from "../redux/actions/libraryActions.js";

import PropTypes from "prop-types";
import {
    nextTrack,
    previousTrack,
    pauseTrack,
    playTrack,
    seekTrack,
    shuffle,
    repeatContext
} from "../redux/actions/playerActions";
// export default function(ComposedComponent) {
// class PlayerHoc extends Component {
//     componentDidMount() {
//         if(this.props.currentTrack.id) {
//             this.props.containsCurrentTrack(this.props.currentTrack.id);
//         }
    
    
// shouldComponentUpdate(nextProps)
//     return nextProps.playing !== this.props.playing;
//   }



// componentDidUpdate(prevProps) {
//     if (prevProps.currentTrack.id !== this.props.currentTrack.id) {
//         const id = this.props.currentTrack.id;
//         const other = this.props.currentTrack.linked_from
//           ? this.props.currentTrack.linked_from.id
//           : null;
//         this.props.containsCurrentTrack(other ? `${id},${other}` : id);
//         }
//     }
export default function(ComposedComponent) {
    class PlayerHoc extends Component {
        componentDidMount() {
            if (this.props.currentTrack.id) {
                this.props.containsCurrentTrack(this.props.currentTrack.id);
            }
        }

        componentDidUpdate(prevProps) {
            if (prevProps.currentTrack.id !== this.props.currentTrack.id) {
                const id = this.props.currentTrack.id;
                const other = this.props.currentTrack.linked_from ? this.props.currentTrack.linked_from.id : null;
                this.props.containsCurrentTrack(other ? `${id},${other}` : id);
            }
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    currentTrack={this.props.currentTrack}
                    playContext={this.props.playContext}
                    playTrack={this.props.playTrack}
                />
            );
        }
    }

    PlayerHoc.propTypes = {
        currentTrack: PropTypes.object.isRequired,
        playTrack: PropTypes.func.isRequired,
        playContext: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        currentTrack: state.playerReducer.status?.track_window?.current_track || {},
        contains: !!state.libraryReducer.containsCurrent,
        trackPosition: state.playerReducer.status?.position,
        playing: !state.playerReducer.status?.paused,
        shuffleActive: state.playerReducer.status?.shuffle,
        repeatActive: state.playerReducer.status?.repeat_mode !== 0,
        tracks: state.libraryReducer.tracks.items || []
    });

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
            {
                nextTrack,
                previousTrack,
                pauseTrack,
                playTrack,
                seekTrack,
                shuffle,
                repeatContext,
                containsCurrentTrack,
                fetchTracks
            },
            dispatch
    );
};

return connect(mapStateToProps, mapDispatchToProps)(PlayerHoc);
}

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { setVolume } from "../redux/actions/playerActions";
import { shuffle, repeatContext } from "../redux/actions/playerActions";

const PlayerControlsHoc = (ComposedComponent) => {
  class PlayerControlsHocComponent extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  PlayerControlsHocComponent.propTypes = {
    setVolume: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    repeatContext: PropTypes.func.isRequired,
    volume: PropTypes.number,
    shuffleActive: PropTypes.bool,
    repeatActive: PropTypes.bool,
  };

  const mapStateToProps = (state) => {
    const playerStatus = state.playerReducer.status;
    return {
      volume: playerStatus ? playerStatus.volume / 100 : 1,
      shuffleActive: playerStatus ? playerStatus.shuffle : false,
      repeatActive: playerStatus ? playerStatus.repeat_mode !== 0 : false,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        setVolume,
        shuffle,
        repeatContext,
      },
      dispatch
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(PlayerControlsHocComponent);
};

export default PlayerControlsHoc;
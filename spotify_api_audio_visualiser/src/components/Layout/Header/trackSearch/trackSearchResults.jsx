import React from "react";
import "./Search.css";
import Track from "../../track/track.jsx";

const TrackSearchResults = (props) => {
  return (
    <div className="search-results">
      <Track
        track={props.track}
        index={props.index}
        isPlaying={props.isPlaying}
        active={props.active}
        chooseTrack={props.chooseTrack}
      />
    </div>

  ) 
}

export default TrackSearchResults
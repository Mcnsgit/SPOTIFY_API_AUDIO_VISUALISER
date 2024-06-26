import React from 'react';
import './newplaylist.scss';


const NewPlaylist = (props) => (
  <div className="new-playlist" onClick={() => props.setModal(true)}>
    <i className="fa fa-plus-circle" />
    New Playlist
  </div>
);

export default NewPlaylist;
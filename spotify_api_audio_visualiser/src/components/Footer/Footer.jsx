import React from 'react';

import Player from '../Player/Player';
import './Footer.css';




const style = {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
    background: 'rgb(40, 40, 40)',
    height: 80,
    zIndex: 2000
  };
  
  const footer = props => (
    <div className="footer" style={style}>
      <Player />
    </div>
  );
  
  export default footer;
  
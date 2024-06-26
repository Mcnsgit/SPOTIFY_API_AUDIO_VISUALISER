import React from 'react';

import '../Header.scss';

const header = props => (
  <div className="details-container">
    <img alt="user" className="user-image" src={props.img} />
    <p className="username">{props.username}</p>
  </div>
);

export default header;

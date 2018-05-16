import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ onClick, entry }) => (
  <div className="media" onClick={onClick}>
    <div className="media-content">
      {entry.title || entry.diploma}
    </div>
  </div>
)

export default Entry;

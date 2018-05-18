import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ diploma, title }) => (
  <a className="panel-block">
    <span className="panel-icon">
      <i className="fa fa-graduation-cap " aria-hidden="true"></i>
    </span>
    { diploma || title }
  </a>
)


export default Entry;

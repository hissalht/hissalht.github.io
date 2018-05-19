import React from 'react';
import PropTypes from 'prop-types';

const EducationEntry = ({ diploma, onClick }) => (
  <a className="panel-block" onClick={onClick}>
    <span className="panel-icon">
      <i className="fa fa-graduation-cap" aria-hidden="true"></i>
    </span>
    {diploma}
  </a>
)

EducationEntry.propTypes = {
  diploma: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default EducationEntry;

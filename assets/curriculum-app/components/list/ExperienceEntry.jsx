import React from 'react';
import PropTypes from 'prop-types';

const ExperienceEntry = ({ title, onClick }) => (
  <a className="panel-block" onClick={onClick}>
    <span className="panel-icon">
      <i className="fa fa-briefcase" aria-hidden="true"></i>
    </span>
    {title}
  </a>
)

ExperienceEntry.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.onClick.isRequired
}

export default ExperienceEntry;

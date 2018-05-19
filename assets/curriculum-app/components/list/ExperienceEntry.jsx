import React from 'react';

const ExperienceEntry = ({ title, onClick }) => (
  <a className="panel-block" onClick={onClick}>
    <span className="panel-icon">
      <i className="fa fa-briefcase" aria-hidden="true"></i>
    </span>
    {title}
  </a>
)

export default ExperienceEntry;

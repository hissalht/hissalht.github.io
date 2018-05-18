import React from 'react';

const ExperienceEntry = ({ title }) => (
  <a className="panel-block">
    <span className="panel-icon">
      <i className="fa fa-briefcase" aria-hidden="true"></i>
    </span>
    {title}
  </a>
)

export default ExperienceEntry;

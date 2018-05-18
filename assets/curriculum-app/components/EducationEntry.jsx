import React from 'react';

const EducationEntry = ({ diploma }) => (
  <a className="panel-block">
    <span className="panel-icon">
      <i className="fa fa-graduation-cap" aria-hidden="true"></i>
    </span>
    {diploma}
  </a>
)

export default EducationEntry;

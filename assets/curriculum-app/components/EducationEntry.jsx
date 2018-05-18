import React from 'react';

const EducationEntry = ({ diploma, onClick }) => (
  <a className="panel-block" onClick={onClick}>
    <span className="panel-icon">
      <i className="fa fa-graduation-cap" aria-hidden="true"></i>
    </span>
    {diploma}
  </a>
)

export default EducationEntry;

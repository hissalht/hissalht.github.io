import React from 'react';

const EducationDisplayEntry = ({
  diploma,
  startYear,
  endYear,
  description,
  field,
  school
}) => (
  <nav className="panel">
    <p className="panel-heading">
      <span className="icon" style={{marginRight: '.5em'}}>
        <i className="fa fa-graduation-cap" aria-hidden="true"></i>
      </span>
      {diploma}
      {' '}
      <span className="has-text-grey" style={{fontSize: 'smaller'}}>
        {startYear} - {endYear}
      </span>
    </p>

    <div className="panel-block">
      {school}
    </div>

    <div className="panel-block">
      {field}
    </div>

    <div className="panel-block">
      {description}
    </div>
  </nav>
)

export default EducationDisplayEntry;

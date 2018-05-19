import React from 'react';
import PropTypes from 'prop-types';

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


EducationDisplayEntry.propTypes = {
  diploma: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired
}

export default EducationDisplayEntry;

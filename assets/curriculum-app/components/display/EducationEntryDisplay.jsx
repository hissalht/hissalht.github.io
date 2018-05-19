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

/*
 * Regular expression matching the ISO 8601 format
 * source: https://www.regextester.com/97766
 */
const iso8601 = RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');

const checkDateFormat = (props, propName, componentName) => {
  if(iso8601.test(props[propName])){
    return new Error(`In ${componentName}, ${propName} doesnt conforms to the ISO 8601 format.`);
  }
}

EducationDisplayEntry.propTypes = {
  diploma: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired
}

export default EducationDisplayEntry;

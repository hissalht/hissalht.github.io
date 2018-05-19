import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const ExperienceEntryDisplay = ({
  title,
  company,
  description,
  endDate,
  startDate,
  place
}) => (
  <nav className="panel">
    <p className="panel-heading">
    {title}
    {' '}
    <span className="has-text-grey" style={{fontSize: 'smaller'}}>
    {moment(startDate).format('MMMM YYYY')} - {moment(endDate).format('MMMM YYYY')}
    </span>
    </p>

    <div className="panel-block">
      {company}, {place}
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

ExperienceEntryDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endDate: checkDateFormat,
  startDate: checkDateFormat,
  place: PropTypes.string.isRequired,
}

export default ExperienceEntryDisplay;

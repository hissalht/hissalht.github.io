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



const checkDateFormat = (props, propName, componentName) => {
  const m = moment(props[propName], moment.ISO_8601, true);
  if(!m.isValid()){
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

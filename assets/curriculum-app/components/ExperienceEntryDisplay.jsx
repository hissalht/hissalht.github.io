import React from 'react';
import moment from 'moment';

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

export default ExperienceEntryDisplay;

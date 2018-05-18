import React from 'react';
import PropTypes from 'prop-types';

import { DataTypes } from '../constants';

const Entry = ({ diploma, title, dataType }) => {
  let className = "fa";

  switch(dataType) {
    case DataTypes.EDUCATION:
      className += " fa-graduation-cap";
      break;
    case DataTypes.EXPERIENCE:
      className += " fa-briefcase";
      break;
    default:
      throw new Error('Unknow data type: ' + dataType);
  }

  return (
    <a className="panel-block">
      <span className="panel-icon">
        <i className={className} aria-hidden="true"></i>
      </span>
      { diploma || title }
    </a>
  )
}

export default Entry;

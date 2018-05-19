import React from 'react';
import PropTypes from 'prop-types';

import { DataTypes } from '../constants';
import EducationEntry from './list/EducationEntry';
import ExperienceEntry from './list/ExperienceEntry';

const Entry = ({ entry, onClick }) => {
  switch(entry.dataType) {
    case DataTypes.EDUCATION:
      return (
        <EducationEntry
          {...entry}
          onClick={onClick}
        />
      )
    case DataTypes.EXPERIENCE:
      return (
        <ExperienceEntry
          {...entry}
          onClick={onClick}
        />
      )
    default:
      throw new Error('Unknow data type: ' + entry.dataType);
  }
}

export default Entry;

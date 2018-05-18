import React from 'react';
import PropTypes from 'prop-types';

import { DataTypes } from '../constants';
import EducationEntry from './EducationEntry';
import ExperienceEntry from './ExperienceEntry';

const Entry = ({ entry }) => {
  switch(entry.dataType) {
    case DataTypes.EDUCATION:
      return <EducationEntry {...entry} />
    case DataTypes.EXPERIENCE:
      return <ExperienceEntry {...entry} />
    default:
      throw new Error('Unknow data type: ' + entry.dataType);
  }
}

export default Entry;

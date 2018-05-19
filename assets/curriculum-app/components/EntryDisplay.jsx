import React from 'react';

import EducationEntryDisplay from './EducationEntryDisplay';
import ExperienceEntryDisplay from './ExperienceEntryDisplay';
import { DataTypes } from '../constants';

const EntryDisplay = ({ entry }) => {
  if (!entry)
    return null
  switch (entry.dataType) {
    case DataTypes.EDUCATION:
      return <EducationEntryDisplay {...entry} />;
    case DataTypes.EXPERIENCE:
      return <ExperienceEntryDisplay {...entry} />;
    default:
      throw new Error('Unknown data type: ' + entry.dataType);
  }
}

export default EntryDisplay;

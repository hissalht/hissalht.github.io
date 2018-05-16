import React from 'react';

import { DataTypes } from '../actions';
import VisibleEntryList from '../containers/VisibleEntryList';

const SideBar = () => (
  <div>
    <VisibleEntryList dataType={DataTypes.EDUCATION} />
    <VisibleEntryList dataType={DataTypes.EXPERIENCE} />
  </div>
)

export default SideBar;

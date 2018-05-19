import React from 'react';

import { VisibilityFilters } from '../constants';
import FilterLink from '../containers/FilterLink'

const PanelTabs = () => (
  <div className="panel-tabs">
    <FilterLink filter={VisibilityFilters.SHOW_ALL} >
      All
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_EDUCATION} >
      Education
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_EXPERIENCE} >
      Experience
    </FilterLink>
  </div >
)

export default PanelTabs;

import React from 'react';

import SearchFilter from '../containers/SearchFilter';
import PanelTabs from './PanelTabs';
import VisibleEntryList from '../containers/VisibleEntryList';

const SidePanel = () => (
  <nav className="panel">
    <p className="panel-heading">Education & Experience</p>

    <SearchFilter />

    <PanelTabs />

    <VisibleEntryList />


  </nav>
)

export default SidePanel;

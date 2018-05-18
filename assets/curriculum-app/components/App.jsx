import React from 'react'

import SidePanel from './SidePanel';
import SelectedEntryDisplay from '../containers/SelectedEntryDisplay';

const App = () => (
  <div className="columns">
    <div className="column is-narrow">
      <SidePanel />
    </div>

    <div className="column">
      <SelectedEntryDisplay />
    </div>
  </div>
)

export default App;

import React from 'react';

import Entry from '../Entry';

const EntryList = ({ entries, selectEntry }) => (
  <React.Fragment>
    {entries.map((entry, index) =>
      <Entry
        key={index}
        entry={entry}
        onClick={() => selectEntry(entry.dataType, entry.id)}
      />
    )}
  </React.Fragment>
)

export default EntryList;

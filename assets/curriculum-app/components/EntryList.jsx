import React from 'react';

import Entry from './Entry';

const EntryList = ({ entries, selectEntry }) => (
  <div>
    {Object.keys(entries).map(id =>
      <Entry
        key={id}
        entry={entries[id]}
        onClick={() => selectEntry(id)}
      />
    )}
  </div>
)

export default EntryList;

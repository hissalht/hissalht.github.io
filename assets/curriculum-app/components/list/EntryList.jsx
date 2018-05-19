import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';

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

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
  selectEntry: PropTypes.func.isRequired
}

export default EntryList;

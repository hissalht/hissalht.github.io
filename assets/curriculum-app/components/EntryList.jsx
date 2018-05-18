import React from 'react';

import Entry from './Entry';

const EntryList = ({ entries, selectEntry }) => (
  <React.Fragment>
    {entries.map((entry, index) =>
      <Entry
        key={index}
        {...entry}
        onClick={() => selectEntry(entry.dataType, entry.id)}
      />
    )}
    {/* <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-graduation-cap " aria-hidden="true"></i>
      </span>
      Bac Scientifique
    </a>

    <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-graduation-cap " aria-hidden="true"></i>
      </span>
      Licence Informatique
    </a>

    <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-briefcase" aria-hidden="true"></i>
      </span>
      [Stage] Web developper
    </a>

    <a className="panel-block">
      <span className="panel-icon">
        <i className="fa fa-briefcase" aria-hidden="true"></i>
      </span>
      Web developper
    </a> */}
  </React.Fragment>
)

export default EntryList;

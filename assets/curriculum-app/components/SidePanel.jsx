import React from 'react';

import SearchFilter from '../containers/SearchFilter';

const SidePanel = () => (
  <nav className="panel">
    <p className="panel-heading">Education & Experience</p>

    <SearchFilter />

    <div className="panel-tabs">
      <a className="is-active">All</a>
      <a>Experience</a>
      <a>Education</a>
    </div>

    <a className="panel-block">
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
    </a>


  </nav>
)

export default SidePanel;

import React from 'react';
import { connect } from 'react-redux';

import { setSearchFilter } from '../actions';

const SearchFilter = ({dispatch}) => {
  let input;

  return (
    <div className="control has-icons-left">
      <input className="input"
             type="text"
             placeholder="Search"
             ref={node => input = node}
             onChange={e => dispatch(setSearchFilter(input.value))}
      />
      <span className="icon is-left">
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </div>
  )
}

export default connect()(SearchFilter);

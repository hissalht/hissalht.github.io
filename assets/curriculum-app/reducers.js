import { combineReducers } from 'redux';

import {
  SELECT_DATA,
  SET_VISIBILITY_FILTER,
  SET_SEARCH_FILTER,
  REQUEST_DATA,
  RECEIVE_DATA
} from './actions';

import { DataTypes } from './constants';


const INIT_ENTRIES = {
  [DataTypes.EDUCATION]: {
    isFetching: false,
    items: {}
  },
  [DataTypes.EXPERIENCE]: {
    isFetching: false,
    items: {}
  }
}


const selectedEntry = (state = null, action) => {
  switch (action.type) {
    case SELECT_DATA:
      return Object.assign({}, state, {
        dataType: action.dataType,
        id: action.id
      });
    default:
      return state;
  }
}


const entries = (
  state = {
    isFetching: false,
    items: {}
  },
  action
) => {
  switch(action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_DATA:
      Object.keys(action.data)
        // Add the datatype field to the received entries.
        .forEach(id => action.data[id].dataType = action.dataType);
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      });
    default:
      return state;
  }
}

const entriesByDataType = (state = INIT_ENTRIES, action) => {
  switch(action.type) {
    case REQUEST_DATA:
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        [action.dataType]: entries(state[action.dataType], action)
      });
    default:
      return state;
  }
}


const filters = (state = INIT_FILTERS, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibility: action.filter
      });
    case SET_SEARCH_FILTER:
      return Object.assign({}, state, {
        search: action.filter
      });
    default:
      return state;
  }
}

export default combineReducers({
  selectedEntry,
  entries: entriesByDataType,
  filters
});

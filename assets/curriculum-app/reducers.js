import { combineReducers } from 'redux';

import { SELECT_DATA, SET_VISIBILITY_FILTER, SET_SEARCH_FILTER } from './actions';

import { DataTypes, VisibilityFilters } from './constants';

const INIT_SELECTED_ENTRY = {
  dataType: DataTypes.EDUCATION,
  id: 2
}

const INIT_ENTRIES = {
  [DataTypes.EDUCATION]: {
    ifFetching: false,
    items: {
      1: {
        id: 1,
        dataType: DataTypes.EDUCATION,
        diploma: 'Licence Informatique'
      },
      2: {
        id: 2,
        dataType: DataTypes.EDUCATION,
        diploma: 'Bac S'
      }
    }
  },
  [DataTypes.EXPERIENCE]: {
    isFetching: false,
    items: {
      1: {
        id: 1,
        dataType: DataTypes.EXPERIENCE,
        title: 'dev web'
      },
      2: {
        id: 2,
        dataType: DataTypes.EXPERIENCE,
        title: 'QA tester'
      }
    }
  }
}

const INIT_FILTERS = {
  visibility: VisibilityFilters.SHOW_ALL,
  search: ''
}


const selectedEntry = (state = INIT_SELECTED_ENTRY, action) => {
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


const entries = (state = INIT_ENTRIES, action) => {
  // we will add data fetching later
  return state;
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
  entries,
  filters
});

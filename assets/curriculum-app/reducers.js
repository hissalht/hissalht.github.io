import { combineReducers } from 'redux';

import { SELECT_DATA, SET_VISIBILITY_FILTER, SET_SEARCH_FILTER } from './actions';

import { DataTypes, VisibilityFilters } from './constants';

export const initialState = {
  selectedEntry: {
    dataType: DataTypes.EDUCATION,
    id: 2
  },
  entries: {
    [DataTypes.EDUCATION]: {
      1: {
        id: 1,
        dataType: DataTypes.EDUCATION,
        diploma: 'licence'
      },
      2: {
        id: 2,
        dataType: DataTypes.EDUCATION,
        diploma: 'bac'
      }
    },
    [DataTypes.EXPERIENCE]: {
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
  },
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  searchFilter: ''
}

const selectedEntry = (state = initialState.selectedEntry, action) => {
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

const entries = (state = initialState.entries, action) => {
  // we will add data fetching later
  return state;
}

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const searchFilter = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default combineReducers({
  selectedEntry,
  entries,
  visibilityFilter,
  searchFilter
});

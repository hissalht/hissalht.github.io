import { combineReducers } from 'redux';

import {
  SELECT_DATA,
  SET_VISIBILITY_FILTER,
  SET_SEARCH_FILTER,
} from '../actions';
import entries from './entries';
import { VisibilityFilters } from '../constants';


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


const filters = (state = {
  visibility: VisibilityFilters.SHOW_ALL,
  search: ''
}, action) => {
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

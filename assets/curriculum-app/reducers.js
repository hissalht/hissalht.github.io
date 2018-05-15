import { combineReducers } from 'redux';

import { DataTypes, SELECT_DATA, TOGGLE_FILTER } from './actions';

export const initialState = {
  selectedEntry: {
    dataType: DataTypes.EDUCATION,
    id: 2
  },
  entries: {
    [DataTypes.EDUCATION]: {
      1: {
        id: 1,
        diploma: 'licence'
      },
      2: {
        id: 2,
        diploma: 'bac'
      }
    },
    [DataTypes.EXPERIENCE]: {
      1: {
        id: 1,
        title: 'dev web'
      },
      2: {
        id: 2,
        title: 'QA tester'
      }
    }
  },
  filters: {
    [DataTypes.EDUCATION]: true,
    [DataTypes.EXPERIENCE]: true
  }
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

const filters = (state = initialState.filters, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        [action.dataType]: !state.dataType
      });
    default:
      return state;
  }
}

// export default (state, action) => {
//   return {
//     selectedEntry: selectedEntry(state.selectedEntry, action),
//     entries: entries(state.entries, action),
//     filters: filters(state.filters, action)
//   }
// }

export default combineReducers({
  selectedEntry,
  entries,
  filters
});

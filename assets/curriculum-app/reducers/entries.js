
import {
  REQUEST_DATA,
  RECEIVE_DATA
} from '../actions';
import { DataTypes } from '../constants';

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

export default entriesByDataType;

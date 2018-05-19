import fetch from 'cross-fetch';
import { DataTypes } from './constants';


/* Select an entry to display. */
export const SELECT_DATA = 'SELECT_DATA';
export const selectData = (dataType, id) => ({
  type: SELECT_DATA,
  dataType,
  id
})

/* Change the visibility filter. */
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})


/* Set the search filter. */
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const setSearchFilter = filter => ({
  type: SET_SEARCH_FILTER,
  filter
})

export const REQUEST_DATA = 'REQUEST_DATA';
export const requestData = dataType => ({
  type: REQUEST_DATA,
  dataType
})

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const receiveData = (dataType, json) => ({
  type: RECEIVE_DATA,
  dataType,
  data: json,
  receivedAt: Date.now()
})

export const fetchEntries = dataType => dispatch => {
  dispatch(requestData(dataType))
  let RQ_URL;
  switch(dataType) {
    case DataTypes.EDUCATION:
      RQ_URL = '/api/cv/education';
      break;
    case DataTypes.EXPERIENCE:
      RQ_URL = '/api/cv/experience';
      break;
    default:
      throw new Error('Unknown data type: ' + dataType);
  }
  return fetch(RQ_URL)
    .then(
      response => response.json(),
      error => console.error('An error occured.', error)
    )
    .then(json => dispatch(receiveData(dataType, json)));
}

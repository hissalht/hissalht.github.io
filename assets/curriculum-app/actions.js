import fetch from 'cross-fetch';
import { DataTypes } from './constants';

export const SELECT_DATA = 'SELECT_DATA';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';


/**
 * Select the entry to display.
 * @param {string} dataType
 * @param {number} id
 * @return {object} redux action
 */
export const selectData = (dataType, id) => ({
  type: SELECT_DATA,
  dataType,
  id
})


/**
 * Change the visibility filter.
 * @param {string} filter new visibility filter. Should be a child of VisibilityFilters : VisibilityFilters.SHOW_ALL, etc.
 * @return {object} redux action
 */
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})


/**
 * Change the search bar filter.
 * @param {string} filter new search filter. Only the entries corresponding to the filter will be displayed.
 * @return {object} redux action
 */
export const setSearchFilter = filter => ({
  type: SET_SEARCH_FILTER,
  filter
})


/**
 * Start a request on the server API.
 * @param {string} dataType type of data to request on the server.
 * @return {object} redux action
 * */
export const requestData = dataType => ({
  type: REQUEST_DATA,
  dataType
})


/**
 * Receive requested data from the server API.
 * @param {string} dataType type of data received
 * @param {object} json received data
 * @return {object} redux action
 */
export const receiveData = (dataType, json) => ({
  type: RECEIVE_DATA,
  dataType,
  data: json,
  receivedAt: Date.now()
})


/**
 * Properly make a request to the API server.
 * @param {string} dataType type of data to fetch
 * @returns {function} redux thunk function
 */
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

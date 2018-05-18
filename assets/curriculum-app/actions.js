


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

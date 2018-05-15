
export const DataTypes = {
  EXPERIENCE: 'EXPERIENCE',
  EDUCATION: 'EDUCATION'
}

/* Select an entry to display. */
export const SELECT_DATA = 'SELECT_DATA';
export const selectData = (dataType, id) => ({
  type: SELECT_DATA,
  dataType,
  id
})

/* Toggle a view filter. */
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const toggleFilter = dataType => ({
  type: TOGGLE_FILTER,
  dataType
})


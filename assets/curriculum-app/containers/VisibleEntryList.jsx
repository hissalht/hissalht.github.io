import { connect } from 'react-redux';

import { selectData } from '../actions';
import { VisibilityFilters, DataTypes } from '../constants';
import EntryList from '../components/list/EntryList';


const filterEntry = (entry, filters) => {
  switch (filters.visibility) {
    case VisibilityFilters.SHOW_EXPERIENCE:
      if (entry.dataType !== DataTypes.EXPERIENCE) return false;
      break;
    case VisibilityFilters.SHOW_EDUCATION:
      if (entry.dataType !== DataTypes.EDUCATION) return false;
      break;
  }

  if (!filters.search.trim())
    return true;

  const expr = RegExp(filters.search, 'i');

  switch (entry.dataType) {
    case DataTypes.EDUCATION:
      return !!entry.diploma.match(expr);
    case DataTypes.EXPERIENCE:
      return !!entry.title.match(expr);
    default:
      throw new Error('Unknow data type: ' + entry.dataType);
  }
}

const getVisibleEntries = (state) => {
  let result = [];
  Object.keys(state.entries).forEach(dataType => {
    Object.keys(state.entries[dataType].items).forEach(id => {
      result.push(state.entries[dataType].items[id]);
    })
  })
  return result.filter(entry => filterEntry(entry, state.filters));
}

const mapStateToProps = (state, props) => ({
  entries: getVisibleEntries(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  selectEntry: (dataType, id) => dispatch(selectData(dataType, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList);

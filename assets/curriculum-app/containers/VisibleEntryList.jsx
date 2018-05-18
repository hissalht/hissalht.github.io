import { connect } from 'react-redux';

import { selectData } from '../actions';
import { VisibilityFilters, DataTypes } from '../constants';
import EntryList from '../components/EntryList';


const getVisibleEntries = (state) => {
  let result = [];
  Object.keys(state.entries).forEach(dataType => {
    Object.keys(state.entries[dataType]).forEach(id => {
      result.push(state.entries[dataType][id]);
    })
  })
  switch(state.visibilityFilter){
    case VisibilityFilters.SHOW_ALL:
      return result;
    case VisibilityFilters.SHOW_EXPERIENCE:
      return result.filter(entry => entry.dataType == DataTypes.EXPERIENCE);
    case VisibilityFilters.SHOW_EDUCATION:
      return result.filter(entry => entry.dataType == DataTypes.EDUCATION);
    default:
      throw new Error('Unknown filter ' + state.visibilityFilter);
  }
  return result;
}

const mapStateToProps = (state, props) => ({
  entries: getVisibleEntries(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  selectEntry: (id, dataType) => dispatch(selectData(dataType, id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList);

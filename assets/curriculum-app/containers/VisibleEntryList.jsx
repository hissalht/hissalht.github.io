import { connect } from 'react-redux';

import { selectData } from '../actions';
import EntryList from '../components/EntryList';


const mapStateToProps = (state, props) => ({
  entries: state.entries[props.dataType]
})

const mapDispatchToProps = (dispatch, props) => ({
  selectEntry: id => dispatch(selectData(props.dataType, id))
})

const VisibleEntryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList);

export default VisibleEntryList;

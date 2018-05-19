import { connect } from 'react-redux';

import EntryDisplay from '../components/EntryDisplay';

const mapStateToProps = (state, props) => state.selectedEntry ? {
  entry: state.entries[state.selectedEntry.dataType].items[state.selectedEntry.id]
} : {
  entry: null
};

export default connect(
  mapStateToProps
)(EntryDisplay);

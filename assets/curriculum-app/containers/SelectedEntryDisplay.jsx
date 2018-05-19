import { connect } from 'react-redux';

import EntryDisplay from '../components/display/EntryDisplay';

const mapStateToProps = (state, props) => ({
  entry: state.selectedEntry
    ? state.entries[state.selectedEntry.dataType].items[state.selectedEntry.id]
    : null
})

export default connect(
  mapStateToProps
)(EntryDisplay);

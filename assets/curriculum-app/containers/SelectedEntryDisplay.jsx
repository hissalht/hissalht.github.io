import { connect } from 'react-redux';

import EntryDisplay from '../components/EntryDisplay';

const mapStateToProps = (state, props) => ({
  entry: state.entries[state.selectedEntry.dataType].items[state.selectedEntry.id]
})

export default connect(
  mapStateToProps
)(EntryDisplay);

import { connect } from 'react-redux';

import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, props) => ({
  active: state.filters.visibility == props.filter
})

const mapDispatchToProps = (dispatch, props) => ({
  onClick: (filter) => dispatch(setVisibilityFilter(props.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

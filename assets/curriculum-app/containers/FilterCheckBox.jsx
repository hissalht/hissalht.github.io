import { connect } from 'react-redux';

import { toggleFilter } from '../actions';
import CheckBox from '../components/CheckBox';

const mapStateToProps = (state, ownProps) => ({
  active: state.filters[ownProps.filter]
})

const mapDispatchToProps = (dipatch, ownProps) => ({
  onChange: () => dipatch(toggleFilter(ownProps.filter))
})

const FilterCheckBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckBox)

export default FilterCheckBox;

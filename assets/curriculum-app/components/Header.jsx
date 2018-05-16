import React from 'react'

import FilterCheckBox from '../containers/FilterCheckBox';
import { DataTypes } from '../actions';

const Header = () => (
  <div className="field is-grouped">
    <FilterCheckBox filter={DataTypes.EXPERIENCE}>
      {DataTypes.EXPERIENCE}
    </FilterCheckBox>
    <FilterCheckBox filter={DataTypes.EDUCATION}>
      {DataTypes.EDUCATION}
    </FilterCheckBox>
  </div>
)

export default Header;

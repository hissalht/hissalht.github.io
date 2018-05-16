import React from 'react'
import PropTypes from 'prop-types';

const CheckBox = ({ active, children, onChange }) => (
  <div className="control">
    <input className="is-checkradio"
           type="checkbox"
           id={children}
           onChange={onChange}
           checked={active}
    />
    <label htmlFor={children} className="is-capitalized">
      {children.toLowerCase()}
    </label>
  </div>
)

CheckBox.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CheckBox;

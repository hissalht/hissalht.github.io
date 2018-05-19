import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => (
  <a
    className={active ? 'is-active': null}
    onClick={onClick}
  >
    {children}
  </a>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link;

import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
  const {
    color,
    size,
  } = props
  return (
    <svg
      fill={color}
      height={size}
      width={size}
      viewBox="0 0 32 32"
    >
      {props.children}
    </svg>
  )
}

Icon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default Icon;

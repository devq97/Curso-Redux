import React from 'react';
import VolumenIcon from '../../icons/components/volume';
import './volume.css';

function Volume(props) {
  return (
    <button
      className="Volume"
    >
      <div
        onClick={props.handleClick}
      >
        <VolumenIcon
        color="white"
        size={25}
        />
      </div>
      <div className="Volume-range">
        <input
          type="range"
          min={0}
          max={1}
          step={.05}
          onChange={props.handleVolumenChange}
          defaultValue={props.value}
        />
      </div>
    </button>
  )
}

export default Volume;

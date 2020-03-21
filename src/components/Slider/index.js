import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Slider.module.scss';

/**
 *
 * @param {{
 * min: string|number;
 * max: string|number;
 * value: string|number;
 * step: string|number;
 * onChange(event: React.ChangeEvent) => void;
 * color?: string;
 * size?: 'small'|'medium'|'large';
 * name?: string;
 * fullwidth: boolean;
 * unit?: string;
 * }} props
 */
export default function Slider({
  min,
  max,
  value,
  step,
  color,
  name,
  size,
  onChange,
  fullwidth,
  unit,
}) {
  return (
    <>
      <input
        className={classnames('slider', fullwidth && 'is-fullwidth')}
        step={step}
        color={color}
        size={size}
        min={min}
        max={max}
        value={value}
        type="range"
        onChange={onChange}
        name={name}
      />
      <div className={styles.labelContainer}>
        <span>
          {min} {unit}
        </span>
        <span>
          {value} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </>
  );
}

Slider.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fullwidth: PropTypes.bool.isRequired,
  name: PropTypes.string,
  unit: PropTypes.string,
};

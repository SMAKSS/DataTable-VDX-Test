import React from 'react';

import UUID from '../../utils/UUID';
import './FormGroup.scss';

/**
 *
 * @param {String} label - select label
 * @param {HTMLElement} icon - main icon
 * @param {HTMLElement} secondaryIcon - secondary icon
 * @param {Function} secondaryIconOnClick - secondary icon handler
 * @param {String} placeholder - select placeholder
 * @param {String} id - select id
 * @param {String} name - select name
 * @param {Array} options - select options
 * @param {String} value - select value
 * @param {Function} onChange - select onchange handler
 * This function is responsible for select component.
 */
function Select({
  label = '',
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  placeholder = null,
  id = null,
  name = null,
  options = [],
  value = '',
  onChange = () => console.log('Please add onchange event!')
}) {
  return (
    <div className='form-group'>
      {icon && <span>{icon}</span>}
      <select
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option
            key={UUID()}
            value={option.key}
            disabled={option.disabled && 'disabled'}
          >
            {option.value}
          </option>
        ))}
      </select>
      {label && <label htmlFor={id}>{label}</label>}
      {secondaryIcon && (
        <span className='secondary-icon arrow' onClick={secondaryIconOnClick}>
          {secondaryIcon}
        </span>
      )}
    </div>
  );
}

export default Select;

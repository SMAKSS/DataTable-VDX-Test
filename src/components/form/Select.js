import React from 'react';

import UUID from '../../utils/UUID';
import './FormGroup.scss';

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

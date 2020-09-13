import React from 'react';

import UUID from '../utils/UUID';

function Select({
  label = '',
  icon = null,
  placeholder = null,
  id = null,
  name = null,
  options = [],
  value = '',
  onChange = () => console.log('Please add onchange event!')
}) {
  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <div className='input-control'>
        {icon && <span className='input-icon'>{icon}</span>}
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
      </div>
    </div>
  );
}

export default Select;

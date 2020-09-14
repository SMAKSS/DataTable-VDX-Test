import React from 'react';

function Input({
  label = '',
  icon = null,
  placeholder = null,
  id = null,
  name = null,
  type = 'text',
  value = '',
  checked = false,
  max = null,
  onChange = () => console.log('Please add onchange event!')
}) {
  return (
    <div className='form-control'>
      {label ? (
        <>
          <label htmlFor={id}>{label}</label>
          <div className='input-control'>
            {icon && <span className='input-icon'>{icon}</span>}
            <input
              placeholder={placeholder}
              id={id}
              name={name}
              type={type}
              value={value}
              checked={checked}
              max={max}
              onChange={onChange}
            />
          </div>
        </>
      ) : (
        <input
          placeholder={placeholder}
          id={id}
          name={name}
          type={type}
          value={value}
          checked={checked}
          max={max}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Input;
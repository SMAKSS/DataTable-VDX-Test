import React, { useRef } from 'react';

import './FormGroup.scss';
import { background } from '../Variables';

function Input({
  refference = null,
  label = '',
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  placeholder = null,
  id = null,
  name = null,
  type = 'text',
  value = '',
  checked = false,
  minLength = null,
  max = null,
  required = false,
  onChange = () => console.log('Please add onchange event!')
}) {
  const labelRef = useRef(null);

  if (value && labelRef.current) {
    labelRef.current.style.cssText = `background-color: ${background};
  line-height: 1px;
  overflow: visible;
  font-size: 1.2rem;
  opacity: 1;
  visibility: inherit;
  top: 0;`;
  } else if (labelRef.current) {
    labelRef.current.style.cssText = '';
  }

  return (
    <div className='form-group'>
      {icon && <span className='icon'>{icon}</span>}
      <input
        ref={refference}
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
        value={value}
        checked={checked}
        minLength={minLength}
        max={max}
        onChange={onChange}
        required={required}
      />
      {label && (
        <label htmlFor={id} ref={labelRef}>
          {label}
        </label>
      )}
      {secondaryIcon && (
        <span
          className='secondary-icon'
          onClick={secondaryIconOnClick}
          style={
            value
              ? { opacity: 1, visibility: 'inherit', transition: 0.2 }
              : { opacity: 0, visibility: 'hidden', transition: 0.2 }
          }
        >
          {secondaryIcon}
        </span>
      )}
    </div>
  );
}

export default Input;

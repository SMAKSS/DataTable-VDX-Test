import React, { useRef } from 'react';

import './FormGroup.scss';
import { background } from '../Variables';

/**
 *
 * @param {Object} refference - refference of the input which uses for styling and other stuff
 * @param {String} title - title of the input
 * @param {String} label - label of input
 * @param {HTMLElement} icon - main icon
 * @param {HTMLElement} secondaryIcon - secondary icon
 * @param {Function} secondaryIconOnClick - secondary icon handler
 * @param {String} id - input id
 * @param {String} type - input type
 * @param {String} value - input value
 * @param {Function} onChange - input onchange handler
 * This function is responsible for Input component.
 */
function Input({
  refference = null,
  label = '',
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  id = null,
  type = 'text',
  value = '',
  onChange = () => console.log('Please add onchange event!'),
  ...props
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
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
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

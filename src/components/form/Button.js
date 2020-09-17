import React from 'react';
import './Button.scss';

/**
 *
 * @param {String} className - button class
 * @param {String} innerText - button text
 * @param {String} spanClassName - button span class
 * @param {Function} onClick - button onclick handler
 * @param {any} props - rest of the props
 * This function is responsible for Button component
 */
function Button({
  className = 'button',
  innerText = 'button',
  spanClassName = 'label',
  onClick = () => console.log('Please add onclick event!'),
  ...props
}) {
  return (
    <button className={className} onClick={onClick} {...props}>
      <span className={spanClassName}>{innerText}</span>
    </button>
  );
}

export default Button;

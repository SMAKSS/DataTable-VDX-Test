import React from 'react';
import './Button.scss';

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

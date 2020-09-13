import React from 'react';

function Button({
  className = 'primary',
  innerText = 'button',
  onClick = () => console.log('Please add onclick event!')
}) {
  return (
    <button className={className} onClick={onClick}>
      <span>{innerText}</span>
    </button>
  );
}

export default Button;

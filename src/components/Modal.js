import React from 'react';

import Locale from '../hooks/Locale';
import { buttons } from '../localization/Dictionary';
import Button from './Button';

function Modal({
  open = false,
  headerText = 'header',
  body = 'body',
  footer = 'footer'
}) {
  const { local } = Locale(buttons);

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-content'>
          <div className='modal-header'>{headerText}</div>
          <div className='modal-body'>{body}</div>
          <div className='modal-footer'>
            {footer}
            <Button innerText={buttons[local.local].close} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

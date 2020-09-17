import React from 'react';

import Locale from '../hooks/Locale';
import { buttons } from '../localization/Dictionary';
import Button from './form/Button';
import './Modal.scss';

/**
 *
 * @param {String} id - id for distincting the modals
 * @param {String|HTMLElement} header - header of modal
 * @param {String|HTMLElement} body - body of modal
 * @param {String|HTMLElement} footer - footer of modal
 */
function Modal({
  id = null,
  header = 'header',
  body = 'body',
  footer = 'footer'
}) {
  const { local } = Locale(buttons);

  /**
   * 
   * @param {Object} e - event interface closing items
   * This function is responsible for closing modal either by clicking close, x, or mask area.
   */
  function modalHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    target.closest('.modal-container').classList.remove('fade-in');
    target.closest('.modal-container').classList.add('fade-out');
    target.closest('body').style.cssText = '';
  }

  return (
    <div className='modal-container' id={id}>
      <div className='mask' onClick={(e) => modalHandler(e)} />
      <div className='modal'>
        <div className='content'>
          <div className='header'>
            {header}
            <span
              onClick={(e) => modalHandler(e)}
              className='close unselectable'
              aria-label='Close'
              data-label='close'
            >
              &times;
            </span>
            <div className='separator' />
          </div>
          <div className='body'>{body}</div>
          <div className='footer'>
            {footer}
            <Button
              onClick={(e) => modalHandler(e)}
              innerText={buttons[local.local].close}
              data-label='close'
              data-type='text'
              data-color='primary'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

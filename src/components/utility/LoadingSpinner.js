import React from 'react';

import styles from './loadingSpinner.module.scss';

/**
 *
 * @param {Boolean} parentDiv
 * @param {String} display
 * @param {String} stroke
 * @returns {HTMLDivElement} It will return a loading spinner with the desired colored passed by stroke
 * @constructor
 */
function LoadingSpinner({
  parentDiv = false,
  display = '',
  stroke = 'path-animation-stroke-other'
}) {
  return (
    <div
      className={`${
        parentDiv ? `${styles.custom_loader_container}` : ''
      } ${display}`}
    >
      <svg
        className={styles.spinner}
        width='35px'
        height='35px'
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          className={`${styles.path} ${styles[stroke]}`}
          fill='none'
          strokeWidth='5'
          strokeLinecap='round'
          cx='33'
          cy='33'
          r='30'
        />
      </svg>
    </div>
  );
}

export default LoadingSpinner;

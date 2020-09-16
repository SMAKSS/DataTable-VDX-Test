import React, { useEffect, useContext, useRef } from 'react';

import SnackBarContext from '../../contexts/SnackBarContext';
import './SnackBar.scss';

function SnackBar({ message = 'error' }) {
  const snackBar = useRef(null);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);

  useEffect(() => {
    if (snackBarStatus) {
      snackBar.current.innerHTML = message;
      snackBar.current.classList.add('show');
      const timeOut = setTimeout(() => {
        snackBar.current.classList.remove('show');
        setSnackBarStatus(false);
      }, 5000);
      return () => clearTimeout(timeOut);
    }
  }, [snackBarStatus, setSnackBarStatus, message, snackBar]);

  return <div className='snack-bar' ref={snackBar}></div>;
}

export default SnackBar;

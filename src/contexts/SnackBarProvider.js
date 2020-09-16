import React, { useState } from 'react';

import SnackBarContext from './SnackBarContext';

function SnackBarProvider(props) {
  const snackBar = useState(false);

  return (
    <SnackBarContext.Provider value={snackBar}>
      {props.children}
    </SnackBarContext.Provider>
  );
}

export default SnackBarProvider;

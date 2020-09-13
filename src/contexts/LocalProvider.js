import React, { useState } from 'react';

import LocalContext from '../contexts/LocalContext';

function LocalProvider(props) {
  const local = useState({ local: 'en' });

  return (
    <LocalContext.Provider value={local}>
      {props.children}
    </LocalContext.Provider>
  );
}

export default LocalProvider;

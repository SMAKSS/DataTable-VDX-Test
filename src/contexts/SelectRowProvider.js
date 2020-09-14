import React, { useState } from 'react';

import SelectRowContext from './SelectRowContext';

function SelectRowProvider(props) {
  const selectedRows = useState({});

  return (
    <SelectRowContext.Provider value={selectedRows}>
      {props.children}
    </SelectRowContext.Provider>
  );
}

export default SelectRowProvider;

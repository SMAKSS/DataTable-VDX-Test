import React from 'react';

import LocalProvider from './contexts/LocalProvider';
import SelectRowProvider from './contexts/SelectRowProvider';
import DataTable from './views/DataTable';

function App() {
  return (
    <LocalProvider>
      <SelectRowProvider>
        <DataTable />
      </SelectRowProvider>
    </LocalProvider>
  );
}

export default App;

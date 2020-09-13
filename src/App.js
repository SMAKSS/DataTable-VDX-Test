import React from 'react';

import LocalProvider from './contexts/LocalProvider';
import DataTable from './views/DataTable';

function App() {
  return (
    <LocalProvider>
      <DataTable />
    </LocalProvider>
  );
}

export default App;

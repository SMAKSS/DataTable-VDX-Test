import React from 'react';

import LocalProvider from './contexts/LocalProvider';
import SelectRowProvider from './contexts/SelectRowProvider';
import SnackBarProvider from './contexts/SnackBarProvider';
import DataTable from './views/DataTable';
import './App.scss';

function App() {
  return (
    <LocalProvider>
      <SelectRowProvider>
        <SnackBarProvider>
          <DataTable />
        </SnackBarProvider>
      </SelectRowProvider>
    </LocalProvider>
  );
}

export default App;

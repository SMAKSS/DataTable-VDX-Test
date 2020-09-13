import React from 'react';

import UUID from '../utils/UUID';

function Table({ headers = [], rows = [] }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={UUID()}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={UUID()}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.surname}</td>
            <td>{row.superhero}</td>
            <td>{row.email}</td>
            <td>{row.gender}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

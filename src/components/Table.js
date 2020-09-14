import React, { useContext } from 'react';

import SelectRowContext from '../contexts/SelectRowContext';
import UUID from '../utils/UUID';
import Input from './Input';

function Table({ headers = [], rows = [] }) {
  const [selectedRows, setSelectedRows] = useContext(SelectRowContext);

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
            <td>
              <div>
                <Input
                  type='checkbox'
                  name={row.id}
                  id={row.id}
                  checked={selectedRows[row.id]}
                  onChange={(e) => {
                    const target = e.target;
                    if (target.checked) {
                      setSelectedRows((prev) => ({
                        ...prev,
                        [target.name]: target.checked
                      }));
                    } else {
                      setSelectedRows((prev) => {
                        const index = Object.keys(prev).indexOf(target.name);
                        if (index !== -1) {
                          delete prev[target.name];
                          target.checked = false;
                        }
                        return { ...prev };
                      });
                    }
                  }}
                />
                <span>{index + 1}</span>
              </div>
            </td>
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

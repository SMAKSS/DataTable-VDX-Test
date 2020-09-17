import React, { useState, useContext } from 'react';

import SelectRowContext from '../contexts/SelectRowContext';
import UUID from '../utils/UUID';
import Input from './form/Input';
import { titles } from '../localization/Dictionary';
import Locale from '../hooks/Locale';
import './Table.scss';

/**
 *
 * @param {Array} headers - all of the table headers
 * @param {Array} rows - all of the table row data
 * @param {String} message - custom message in case of no record
 * This function is responsible for the table creation
 */
function Table({ headers = [], rows = [], message = 'No Record' }) {
  const { local } = Locale(titles);
  const [state, setState] = useState({ check: false, rows: rows, odd: false });
  const [selectedRows, setSelectedRows] = useContext(SelectRowContext);

  /**
   *
   * @param {Object} e - event interface of table headers
   * This function is responsible for sorting data by columns (odd clicks ASC, even clicks DESC)
   */
  function sortHandler(e) {
    const target = e.target;
    const column = target.dataset.name;
    setState((prev) => ({
      ...prev,
      odd: !state.odd,
      rows: rows.sort((a, b) =>
        state.odd
          ? a[column] > b[column]
            ? 1
            : -1
          : a[column] > b[column]
          ? -1
          : 1
      )
    }));
  }

  /**
   * This function is responsible for checking all the table rows for deleting all at once
   */
  function checkAllHandler() {
    setState((prev) => ({ ...prev, check: !state.check }));
    if (!state.check && rows.length > 0) {
      rows.forEach((row) => {
        setSelectedRows((prev) => ({
          ...prev,
          [row.id]: true
        }));
      });
    } else if (state.check) {
      rows.forEach((row) => {
        setSelectedRows((prev) => {
          const index = Object.keys(prev).indexOf(row.id);
          if (index !== -1) {
            delete prev[row.id];
          }
          return { ...prev };
        });
      });
    }
  }

  /**
   *
   * @param {Object} e - event interface of input checkbox related to each row
   * This function is responsible for check and updating selectedRow context for deleting purposes.
   */
  function checkBoxHandler(e) {
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
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={UUID()}
              data-name={header.key}
              onClick={
                index !== 0
                  ? (e) => {
                      sortHandler(e);
                    }
                  : null
              }
            >
              {index === 0 ? (
                <div className='no-cell'>
                  <Input
                    type='checkbox'
                    title={titles[local.local].selectAll}
                    checked={state.check}
                    onChange={() => checkAllHandler()}
                  />
                  <span>{header.name}</span>
                </div>
              ) : (
                header.name
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.rows.length === 0 ? (
          <tr>
            <td className='empty unselectable' colSpan={headers.length}>
              {message}
            </td>
          </tr>
        ) : (
          state.rows.map((row, index) => (
            <tr key={UUID()}>
              <td>
                <div className='no-cell'>
                  <Input
                    type='checkbox'
                    name={row.id}
                    id={row.id}
                    checked={selectedRows[row.id]}
                    onChange={(e) => checkBoxHandler(e)}
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
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;

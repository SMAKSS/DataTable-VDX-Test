import React, { useContext, useEffect, useState, useCallback } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';
import AddNewRecord from '../components/AddNewRecord';
import { titles, buttons } from '../localization/Dictionary';
import SelectRowContext from '../contexts/SelectRowContext';
import Locale from '../hooks/Locale';
import firebase from '../firebase.js';

function DataTable() {
  const { local } = Locale(titles);
  const { local: buttonsLocal } = Locale(buttons);
  const [selectedRows] = useContext(SelectRowContext);
  const [state, setState] = useState({
    allData: [],
    searchText: '',
    filteredData: []
  });

  const resolveRows = useCallback(() => {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          name: items[item].name,
          surname: items[item].surname,
          superhero: items[item].superhero,
          email: items[item].email,
          gender: items[item].gender,
          age: items[item].age
        });
      }
      setState((prev) => ({ ...prev, allData: newState }));
    });
  }, []);

  function deleteHandler(e) {
    e.preventDefault();
    Object.keys(selectedRows).forEach((selectedRow) => {
      const itemRef = firebase.database().ref(`/items/${selectedRow}`);
      itemRef.remove();
    });
  }

  const searchHandler = useCallback(() => {
    const filtered = [];
    state.allData.forEach((data) => {
      for (let key in data) {
        if (
          key !== 'id' &&
          data[key].indexOf(state.searchText) !== -1 &&
          !filtered.some((el) => el.id === data.id)
        ) {
          filtered.push(data);
        }
      }
    });

    setState((prev) => ({ ...prev, filteredData: filtered }));
  }, [state.allData, state.searchText]);

  useEffect(() => {
    resolveRows();
  }, [resolveRows]);

  useEffect(() => {
    const timeOut = state.searchText
      ? setTimeout(() => searchHandler(), 300)
      : null;
    return () => clearTimeout(timeOut);
  }, [state.searchText, searchHandler]);

  return (
    <>
      <div className='top-bar'>
        <Input
          value={state.searchText}
          name='search'
          id='search'
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, searchText: target.value }));
          }}
        />
        <Button
          innerText={buttons[buttonsLocal.local].delete}
          onClick={(e) => deleteHandler(e)}
        />
        <Button innerText={buttons[buttonsLocal.local].add} />
      </div>
      <Table
        headers={[
          titles[local.local].select,
          titles[local.local].firstName,
          titles[local.local].lastName,
          titles[local.local].superHeroName,
          titles[local.local].email,
          titles[local.local].gender,
          titles[local.local].age
        ]}
        rows={!state.searchText ? state.allData : state.filteredData}
      />
      <AddNewRecord />
    </>
  );
}

export default DataTable;

import React, { useContext, useEffect, useState } from 'react';

import SelectRowContext from '../contexts/SelectRowContext';
import Locale from '../hooks/Locale';
import { titles } from '../localization/Dictionary';
import Input from '../components/Input';
import Button from '../components/Button';
import Table from '../components/Table';
import AddNewRecord from '../components/AddNewRecord';
import firebase from '../firebase.js';

function DataTable() {
  const { local } = Locale(titles);
  const [selectedRows] = useContext(SelectRowContext);
  const [state, setState] = useState([]);

  useEffect(() => {
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
      setState([...newState]);
    });
  }, []);

  function deleteHandler(e) {
    e.preventDefault();
    Object.keys(selectedRows).forEach((selectedRow) => {
      const itemRef = firebase.database().ref(`/items/${selectedRow}`);
      itemRef.remove();
    });
  }

  return (
    <>
      <div className='top-bar'>
        <Input />
        <Button innerText='Delete' onClick={(e) => deleteHandler(e)} />
        <Button innerText='Add New Record' />
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
        rows={state}
      />
      <AddNewRecord />
    </>
  );
}

export default DataTable;

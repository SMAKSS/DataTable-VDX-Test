import React, { useContext, useEffect, useState, useCallback } from 'react';

import LoadingSpinner from '../components/utility/LoadingSpinner';
import Input from '../components/form/Input';
import Button from '../components/form/Button';
import Table from '../components/Table';
import AddNewRecord from '../components/AddNewRecord';
import Modal from '../components/Modal';
import Search from '../components/icons/Search';
import Clear from '../components/icons/Clear';
import { titles, buttons, messages } from '../localization/Dictionary';
import SelectRowContext from '../contexts/SelectRowContext';
import Locale from '../hooks/Locale';
import firebase from '../firebase.js';
import './DataTable.scss';

function DataTable() {
  const { local } = Locale(titles);
  const { local: buttonsLocal } = Locale(buttons);
  const { local: messagesLocal } = Locale(messages);
  const [selectedRows] = useContext(SelectRowContext);
  const [state, setState] = useState({
    allData: [],
    searchText: '',
    filteredData: [],
    loading: true
  });

  const calculateAge = useCallback((birthday) => {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);

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
          age: calculateAge(items[item].age)
        });
      }
      setState((prev) => ({ ...prev, allData: newState, loading: false }));
    });
  }, [calculateAge]);

  function modalHandler(e, modalId) {
    e.preventDefault();
    const modal = document.querySelector(`#${modalId}`);
    modal.closest('body').style.cssText = 'overflow: hidden;';
    modal.classList.remove('fade-out');
    modal.classList.add('fade-in');
  }

  function deleteRecords(e) {
    e.preventDefault();
    Object.keys(selectedRows).forEach((selectedRow) => {
      const itemRef = firebase.database().ref(`/items/${selectedRow}`);
      itemRef.remove();
    });
    const modal = document.querySelector(`#delete`);
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    modal.closest('body').style.cssText = '';
  }

  const searchHandler = useCallback(() => {
    const filtered = [];
    state.allData.forEach((data) => {
      for (let key in data) {
        if (
          key !== 'id' &&
          data[key].toString().indexOf(state.searchText) !== -1 &&
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
      ? setTimeout(() => searchHandler(), 200)
      : null;
    return () => clearTimeout(timeOut);
  }, [state.searchText, searchHandler]);

  const modalBody = (
    <p>
      {messages[messagesLocal.local].deleteRecords.replace(
        '{count}',
        Object.keys(selectedRows).length
      )}
    </p>
  );

  const modalFooter = (
    <Button
      innerText={buttons[local.local].delete}
      onClick={(e) => deleteRecords(e)}
    />
  );

  if (state.loading) {
    return (
      <LoadingSpinner parentDiv={true} stroke={'path-animation-stroke-other'} />
    );
  } else {
    return (
      <>
        <div className='top-bar'>
          <Input
            value={state.searchText}
            name='search'
            id='search'
            placeholder={titles[local.local].search}
            icon={<Search />}
            secondaryIcon={<Clear />}
            secondaryIconOnClick={() =>
              setState((prev) => ({ ...prev, searchText: '' }))
            }
            onChange={(e) => {
              const target = e.target;
              setState((prev) => ({ ...prev, searchText: target.value }));
            }}
          />
          <div className='button-container'>
            <Button
              innerText={buttons[buttonsLocal.local].delete}
              onClick={(e) => modalHandler(e, 'delete')}
              disabled={Object.keys(selectedRows).length === 0 ? true : false}
            />
            <Button
              onClick={(e) => modalHandler(e, 'add')}
              innerText={buttons[buttonsLocal.local].add}
            />
          </div>
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
          message={messages[messagesLocal.local].noRecord}
        />
        <AddNewRecord />
        <Modal
          id='delete'
          header={buttons[buttonsLocal.local].delete}
          body={modalBody}
          footer={modalFooter}
        />
      </>
    );
  }
}

export default DataTable;

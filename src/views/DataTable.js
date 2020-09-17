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

/**
 * This is the main view of the app which contains all of forms, assets and tables.
 */
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

  /**
   * @param {Object} Date - birthday is a date format (mm-dd-yyyy) which points to the birthday of user record
   * This function is responsible for converting date to age
   */
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

  /**
   * This function is responsible for initial data read from database once the page is try to mount
   */
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

  /**
   *
   * @param {Object} e - event interface of buttons which responsible for opening the modal
   * @param {String} modalId - a string for distinguishing the modals
   * This function is mainly responsible for opening modals
   */
  function modalHandler(e, modalId) {
    e.preventDefault();
    const modal = document.querySelector(`#${modalId}`);
    modal.closest('body').style.cssText = 'overflow: hidden;';
    modal.classList.remove('fade-out');
    modal.classList.add('fade-in');
  }

  /**
   *
   * @param {Object} e - event interface of modal delete button
   * This function will delete all the selected records after the prompt condescending
   */
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

  /**
   * This function is responsible for searching the table to match provided keywords by user.
   * We just use a regex here and an i flag to avoid inconsistency between upper and lower case searches.
   */
  const searchHandler = useCallback(() => {
    const filtered = [];
    const regex = new RegExp(state.searchText, 'i');
    state.allData.forEach((data) => {
      for (let key in data) {
        if (
          key !== 'id' &&
          data[key].toString().match(regex) &&
          !filtered.some((el) => el.id === data.id)
        ) {
          filtered.push(data);
        }
      }
    });

    setState((prev) => ({ ...prev, filteredData: filtered }));
  }, [state.allData, state.searchText]);

  /**
   * This useEffect is responsible for executing initial data load function.
   */
  useEffect(() => {
    resolveRows();
  }, [resolveRows]);

  /**
   * This useEffect is responsible for executing a keyword search with debouncing.
   */
  useEffect(() => {
    const timeOut = state.searchText
      ? setTimeout(() => searchHandler(), 300)
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
      data-type='main'
      data-color='danger'
    />
  );

  /**
   * If accessing to firebase database face a problem
   * or being in progress the loading spinner will replace the main page.
   */
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
              data-label='delete'
              data-type='outline'
              data-color='danger'
            />
            <Button
              onClick={(e) => modalHandler(e, 'add')}
              innerText={buttons[buttonsLocal.local].add}
              data-label='add'
              data-type='main'
              data-color='primary'
            />
          </div>
        </div>
        <Table
          headers={[
            { name: titles[local.local].select, key: 'id' },
            { name: titles[local.local].firstName, key: 'name' },
            { name: titles[local.local].lastName, key: 'surname' },
            { name: titles[local.local].superHeroName, key: 'superhero' },
            { name: titles[local.local].email, key: 'email' },
            { name: titles[local.local].gender, key: 'gender' },
            { name: titles[local.local].age, key: 'age' }
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

import React, { useState, useEffect, useRef, useContext } from 'react';

import SnackBarContext from '../contexts/SnackBarContext';
import Locale from '../hooks/Locale';
import { titles, buttons, messages } from '../localization/Dictionary';
import Input from './form/Input';
import Select from './form/Select';
import Button from './form/Button';
import Modal from '../components/Modal';
import SnackBar from '../components/utility/SnackBar';
import firebase from '../firebase.js';
import Clear from './icons/Clear';
import arrowDown from '../assets/images/arrow-down.png';
import { error } from '../components/Variables';

function AddNewRecord() {
  const { local } = Locale(buttons);
  const { local: titlesLocal } = Locale(titles);
  const { local: messagesLocal } = Locale(messages);
  const [snackBarStatus, setSnackBarStatus] = useContext(SnackBarContext);
  // eslint-disable-next-line
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const initialState = {
    name: '',
    surname: '',
    superhero: '',
    email: '',
    gender: '',
    age: '',
    status: ''
  };
  const [state, setState] = useState(initialState);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const superheroRef = useRef(null);
  const emailRef = useRef(null);

  function hadleSubmit(e) {
    e.preventDefault();
    const isValid = Boolean(
      state.name &&
        state.name.length > 1 &&
        state.surname &&
        state.surname.length > 1 &&
        state.superhero &&
        state.superhero.length > 1 &&
        state.email &&
        emailRegex.test(state.email) &&
        state.gender &&
        state.age
    );

    if (isValid) {
      const submittedData = JSON.parse(JSON.stringify(state));
      delete submittedData.status;
      const itemsRef = firebase.database().ref('items');
      itemsRef.push(submittedData);
      setState((prev) => ({ ...prev, ...initialState }));
      setSnackBarStatus(true);
    } else {
      setState((prev) => ({ ...prev, status: 'error' }));
      setSnackBarStatus(true);
    }
  }

  useEffect(() => {
    if (state.name && state.name.length <= 1 && nameRef.current) {
      nameRef.current.style.cssText = `border-color: ${error};`;
    } else if (!state.name || state.name.length > 1) {
      nameRef.current.style.cssText = '';
    }

    if (state.surname && state.surname.length <= 1 && surnameRef.current) {
      surnameRef.current.style.cssText = `border-color: ${error};`;
    } else if (!state.surname || state.surname.length > 1) {
      surnameRef.current.style.cssText = '';
    }

    if (
      state.superhero &&
      state.superhero.length <= 1 &&
      superheroRef.current
    ) {
      superheroRef.current.style.cssText = `border-color: ${error};`;
    } else if (!state.superhero || state.superhero.length > 1) {
      superheroRef.current.style.cssText = '';
    }

    const emailTest = emailRegex.test(state.email);

    if (state.email && !emailTest && emailRef.current) {
      emailRef.current.style.cssText = `border-color: ${error};`;
    } else if (emailTest || !state.email) {
      emailRef.current.style.cssText = '';
    }
  }, [state.name, state.surname, state.superhero, state.email, emailRegex]);

  const modalBody = (
    <>
      <form>
        <Input
          refference={nameRef}
          value={state.name}
          name='name'
          id='name'
          minLength={2}
          label={titles[titlesLocal.local].firstName}
          secondaryIcon={<Clear />}
          secondaryIconOnClick={() =>
            setState((prev) => ({ ...prev, name: '' }))
          }
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, name: target.value }));
          }}
        />
        <Input
          refference={surnameRef}
          value={state.surname}
          name='surname'
          id='surname'
          minLength={2}
          label={titles[titlesLocal.local].lastName}
          secondaryIcon={<Clear />}
          secondaryIconOnClick={() =>
            setState((prev) => ({ ...prev, surname: '' }))
          }
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, surname: target.value }));
          }}
        />
        <Input
          refference={superheroRef}
          value={state.superhero}
          name='superhero'
          id='superhero'
          minLength={2}
          label={titles[titlesLocal.local].superHeroName}
          secondaryIcon={<Clear />}
          secondaryIconOnClick={() =>
            setState((prev) => ({ ...prev, superhero: '' }))
          }
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, superhero: target.value }));
          }}
        />
        <Input
          refference={emailRef}
          value={state.email}
          type='email'
          name='email'
          id='email'
          label={titles[titlesLocal.local].email}
          secondaryIcon={<Clear />}
          secondaryIconOnClick={() =>
            setState((prev) => ({ ...prev, email: '' }))
          }
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, email: target.value }));
          }}
        />
        <Select
          value={state.gender}
          name='gender'
          id='gender'
          label={titles[titlesLocal.local].gender}
          secondaryIcon={
            <img className='unselectable' src={arrowDown} alt='arrow' />
          }
          options={[
            { key: '', value: 'Select Gender', disabled: true },
            { key: 'male', value: 'Male' },
            { key: 'female', value: 'Female' },
            { key: 'none', value: 'Do not want to indicate' }
          ]}
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, gender: target.value }));
          }}
        />
        <Input
          value={state.age}
          type='date'
          name='age'
          id='age'
          minLength={1}
          label={titles[titlesLocal.local].birthdate}
          max={new Date(new Date().getTime()).toISOString().split('T')[0]}
          required={true}
          onChange={(e) => {
            const target = e.target;
            setState((prev) => ({ ...prev, age: target.value }));
          }}
        />
      </form>
    </>
  );

  const modalFooter = (
    <Button
      innerText={buttons[local.local].save}
      onClick={(e) => hadleSubmit(e)}
    />
  );

  return (
    <>
      <Modal
        id='add'
        header={titles[titlesLocal.local].add}
        body={modalBody}
        footer={modalFooter}
      />
      {snackBarStatus && (
        <SnackBar
          message={
            state.status === 'error'
              ? messages[messagesLocal.local].addSnackBarFailed
              : messages[messagesLocal.local].addSnackBarSuccessful
          }
        />
      )}
    </>
  );
}

export default AddNewRecord;

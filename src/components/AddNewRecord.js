import React, { useState } from 'react';

import Locale from '../hooks/Locale';
import { titles, buttons } from '../localization/Dictionary';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Modal from '../components/Modal';
import firebase from '../firebase.js';

function AddNewRecord() {
  const { local } = Locale(buttons);
  const { local: titlesLocal } = Locale(titles);

  const [state, setState] = useState({
    name: '',
    surname: '',
    superhero: '',
    email: '',
    gender: '',
    age: ''
  });

  const modalBody = (
    <>
      <Input
        value={state.name}
        name='name'
        id='name'
        label={titles[titlesLocal.local].firstName}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, name: e.target.value }));
        }}
      />
      <Input
        value={state.surname}
        name='surname'
        id='surname'
        label={titles[titlesLocal.local].lastName}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, surname: e.target.value }));
        }}
      />
      <Input
        value={state.superhero}
        name='superhero'
        id='superhero'
        label={titles[titlesLocal.local].superHeroName}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, superhero: e.target.value }));
        }}
      />
      <Input
        value={state.email}
        type='email'
        name='email'
        id='email'
        label={titles[titlesLocal.local].email}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <Select
        value={state.gender}
        name='gender'
        id='gender'
        label={titles[titlesLocal.local].gender}
        options={[
          { key: '', value: 'Select Gender', disabled: true },
          { key: 'male', value: 'Male' },
          { key: 'female', value: 'Female' },
          { key: 'none', value: 'Do not want to indicate' }
        ]}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, gender: e.target.value }));
        }}
      />
      <Input
        value={state.age}
        type='date'
        name='age'
        id='age'
        label={titles[titlesLocal.local].birthdate}
        max={new Date(new Date().getTime()).toISOString().split('T')[0]}
        onChange={(e) => {
          e.persist();
          setState((prev) => ({ ...prev, age: e.target.value }));
        }}
      />
    </>
  );

  const modalFooter = (
    <Button
      innerText={buttons[local.local].save}
      onClick={(e) => handleClick(e)}
    />
  );

  function handleClick(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    itemsRef.push(state);
  }

  return <Modal body={modalBody} footer={modalFooter} />;
}

export default AddNewRecord;

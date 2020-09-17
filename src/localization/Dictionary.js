/* Since I did not use localization tools like i18n 
 I just made a simple dictionary for localization purposes */

const titles = {
  en: {
    select: '#',
    firstName: 'First Name',
    lastName: 'Last Name',
    superHeroName: 'Superhero Name',
    email: 'Email',
    gender: 'Gender',
    age: 'Age',
    birthdate: 'Birth Date',
    add: 'Add New Record',
    search: 'Search in table',
    selectAll: 'Select All'
  }
};

const buttons = {
  en: {
    close: 'Close',
    ok: 'OK',
    add: 'Add New Item',
    delete: 'Delete',
    save: 'Save'
  }
};

const messages = {
  en: {
    noRecord: 'No record available!',
    addSnackBarFailed: 'Please fill all the inputs or fix the red ones!',
    addSnackBarSuccessful: 'Record saved successfully!',
    deleteRecords: 'Are you sure you want to delete {count} record(s)?'
  }
};

export { titles, buttons, messages };

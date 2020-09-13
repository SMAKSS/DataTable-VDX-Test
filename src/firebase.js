import firebase from 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'vdx-datatable.firebaseapp.com',
  databaseURL: 'https://vdx-datatable.firebaseio.com',
  projectId: 'vdx-datatable',
  storageBucket: 'vdx-datatable.appspot.com',
  messagingSenderId: '547839151537',
  appId: '1:547839151537:web:4aa7c99e4be9d6ac254190'
};

firebase.initializeApp(config);
export default firebase;

/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDX9bQgcwM3c9KeoZFhgbmWQwTZ1QdlohI',
  authDomain: 'firenotes-c6061.firebaseapp.com',
  projectId: 'firenotes-c6061',
  storageBucket: 'firenotes-c6061.appspot.com',
  messagingSenderId: '121433074918',
  appId: '1:121433074918:web:da0af193a26226ffea9f27',
  measurementId: 'G-X23DV7Z2PJ',
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function onNotesValueChange(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    console.log(callback);
    callback(newNoteState);
  });
}

export function dragNote(id, x, y) {
  console.log(id);
  firebase.database().ref('notes').child(id.x).update(x);
  firebase.database().ref('notes').child(id.y).update(y);
}

export function addNote(newNote) {
  firebase.database().ref('notes').push(newNote);
}

export function removeNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function updateNote(id, updatedfield) {
  firebase.database().ref('notes').child(id).update(updatedfield);
}

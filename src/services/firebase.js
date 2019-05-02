import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBwUM2FQpisOTzNzznShVKGK6gL7Xxp96I",
  authDomain: "financebud-579c5.firebaseapp.com",
  databaseURL: "https://financebud-579c5.firebaseio.com",
  projectId: "financebud-579c5",
  storageBucket: "financebud-579c5.appspot.com",
  messagingSenderId: "330057831454"
};

firebase.initializeApp(config);

export default firebase;
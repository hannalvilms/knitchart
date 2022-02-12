// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZeHRSIprrSiuw6shXpOGtQ0bPBMH0Gm0",
  authDomain: "knitchart.firebaseapp.com",
  databaseURL: "https://knitchart-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "knitchart",
  storageBucket: "knitchart.appspot.com",
  messagingSenderId: "548136610760",
  appId: "1:548136610760:web:2c7d19fbf53d71377faefd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export {projectStorage, projectFirestore, timestamp}
 
// // Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


// // Your web app's Firebase configuration

// const firebaseConfig = {

//   apiKey: "AIzaSyDZBXYVu3YnjAswaRWGU1c0fDL6ez8BH6c",

//   authDomain: "filmoteka-grupa-3.firebaseapp.com",

//   projectId: "filmoteka-grupa-3",

//   storageBucket: "filmoteka-grupa-3.appspot.com",

//   messagingSenderId: "538761302139",

//   appId: "1:538761302139:web:d6e155c2b99cffca5852de"

// };


// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyDZBXYVu3YnjAswaRWGU1c0fDL6ez8BH6c',
    
   authDomain: "filmoteka-grupa-3.firebaseapp.com",

   projectId: "filmoteka-grupa-3",

   storageBucket: "filmoteka-grupa-3.appspot.com",

   messagingSenderId: "538761302139",

   appId: "1:538761302139:web:d6e155c2b99cffca5852de"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
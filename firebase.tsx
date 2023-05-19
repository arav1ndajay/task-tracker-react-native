// // Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkkpmaJQLWIc2N_2_CTTL0kdjpR1ec9_0",
  authDomain: "trial-auth-21200.firebaseapp.com",
  projectId: "trial-auth-21200",
  storageBucket: "trial-auth-21200.appspot.com",
  messagingSenderId: "581713406917",
  appId: "1:581713406917:web:855cd3c40815f417a779ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export {auth, db};

// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDkkpmaJQLWIc2N_2_CTTL0kdjpR1ec9_0",
//   authDomain: "trial-auth-21200.firebaseapp.com",
//   projectId: "trial-auth-21200",
//   storageBucket: "trial-auth-21200.appspot.com",
//   messagingSenderId: "581713406917",
//   appId: "1:581713406917:web:855cd3c40815f417a779ac"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

// const auth = firebase.auth()

// export { auth };


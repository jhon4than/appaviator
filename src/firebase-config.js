// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfaNmtgyo1VgqVFIHJ8vq-dekSJyjjk9c",
  authDomain: "login-app-a4816.firebaseapp.com",
  projectId: "login-app-a4816",
  storageBucket: "login-app-a4816.appspot.com",
  messagingSenderId: "653367042131",
  appId: "1:653367042131:web:95be958a59dde1477c26a6",
  measurementId: "G-J0SB1FB8LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
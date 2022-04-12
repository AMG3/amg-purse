import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnqC1HddiAJepIl_POe9o7Vwoi9w_rCpM",
  authDomain: "amg-purse.firebaseapp.com",
  projectId: "amg-purse",
  storageBucket: "amg-purse.appspot.com",
  messagingSenderId: "410772939886",
  appId: "1:410772939886:web:840a7042d3c051c043727f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreApp = () => {
  return app;
};

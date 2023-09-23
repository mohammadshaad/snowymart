// import * as firebase from "firebase";

// import "firebase/storage";
// import "firebase/firestore";
// import "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyCWt5sgt3WvQ4GjEiOezyZrK13ODaSYPaQ",
//   authDomain: "enactus-ecommerce-e840f.firebaseapp.com",
//   databaseURL: "https://enactus-ecommerce-e840f-default-rtdb.firebaseio.com",
//   projectId: "enactus-ecommerce-e840f",
//   storageBucket: "enactus-ecommerce-e840f.appspot.com",
//   messagingSenderId: "1050946403575",
//   appId: "1:1050946403575:web:501c9e8be00165d5aca7f2",
//   measurementId: "G-F9JF3VY4R2"
// };

// firebase.initializeApp(firebaseConfig);


// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();

// export { auth, db, storage, firebase };

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWt5sgt3WvQ4GjEiOezyZrK13ODaSYPaQ",
  authDomain: "enactus-ecommerce-e840f.firebaseapp.com",
  databaseURL: "https://enactus-ecommerce-e840f-default-rtdb.firebaseio.com",
  projectId: "enactus-ecommerce-e840f",
  storageBucket: "enactus-ecommerce-e840f.appspot.com",
  messagingSenderId: "1050946403575",
  appId: "1:1050946403575:web:501c9e8be00165d5aca7f2",
  measurementId: "G-F9JF3VY4R2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage, firebase };

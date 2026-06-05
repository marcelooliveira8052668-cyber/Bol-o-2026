import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc
}
from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBVe8FExJ4VcV2Hr9zM0Cmi1dzUx7bM49o",
  authDomain: "rumo-ao-hexa-2026.firebaseapp.com",
  projectId: "rumo-ao-hexa-2026",
  storageBucket: "rumo-ao-hexa-2026.firebasestorage.app",
  messagingSenderId: "477014876821",
  appId:  "1:477014876821:web:1de69ea71be87e0ca7f19c"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc
};
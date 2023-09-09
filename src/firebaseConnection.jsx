
import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = {
  apiKey: "AIzaSyBIukJCRivohRcNz4rlJECA4YjdrDOi3HY",
  authDomain: "gerencia-de-tarefa.firebaseapp.com",
  databaseURL: "https://gerencia-de-tarefa-default-rtdb.firebaseio.com",
  projectId: "gerencia-de-tarefa",
  storageBucket: "gerencia-de-tarefa.appspot.com",
  messagingSenderId: "753147327416",
  appId: "1:753147327416:web:cd0249d44db25667a1d54d",
  measurementId: "G-MCMN0820R3"
};

const fb = initializeApp(firebaseApp)
const db = getFirestore(fb)

export {db}


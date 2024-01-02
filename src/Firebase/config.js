import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCMzSJPz31NDcbhO1xeju2cYdMMcMxgkPQ",
  authDomain: "olx-clone-cf479.firebaseapp.com",
  projectId: "olx-clone-cf479",
  storageBucket: "olx-clone-cf479.appspot.com",
  messagingSenderId: "680621197801",
  appId: "1:680621197801:web:a12c5bfc922ff89d932378",
  measurementId: "G-SDXQMNQBSC",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth , firestore , storage };
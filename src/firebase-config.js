import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGE}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);

    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  picture,
  isInvestor,
  isUMKM
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      email,
      picture,
      isInvestor,
      isUMKM,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
const storage = getStorage(app);

export {
  storage,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

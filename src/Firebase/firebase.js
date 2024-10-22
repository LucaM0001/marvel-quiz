import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { doc, getFirestore, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID,
}

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth(this.app)
    this.db = getFirestore(this.app)
  }

  // signup
  signupUser = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password)

  // login
  loginUser = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password)

  // logout
  signoutUser = () => this.auth.signOut()

  // forgetpassword
  passwordReset = (email) => sendPasswordResetEmail(this.auth, email)

  user = (uid, data) => setDoc(doc(this.db, "users", `${uid}`), { ...data })
}

export default Firebase

import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"

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

  // setUser
  setUser = (uid, data) => setDoc(doc(this.db, "users", `${uid}`), { ...data })

  // getUser
  async getUser(userId) {
    try {
      const docRef = doc(this.db, "users", userId) // Utilise la collection "users"
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { ...docSnap.data() } // Renvoie les données utilisateur
      } else {
        throw new Error("L'utilisateur n'existe pas")
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      throw error // Lève une exception pour la gestion d'erreurs
    }
  }
}

export default Firebase

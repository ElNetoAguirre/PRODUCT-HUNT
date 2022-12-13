import { initializeApp } from "firebase/app"
import firebaseConfig from "./config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile/* , signOut  */} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.db = getFirestore()
    this.storage = getStorage(this.app)
  }

  // Registra un usuario
  async registrar(nombre, email, password) {
    const {user} = await createUserWithEmailAndPassword(this.auth, email, password)
    await updateProfile(user, {displayName: nombre})
    return ({...user, displayName: nombre})
  }

  // Inicia sesión del usuario
  async login(email, password) {
    const userlogin = await signInWithEmailAndPassword(this.auth, email, password)
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await this.auth.signOut()
  }
}

const firebase = new Firebase()
export default firebase

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, query, collection } from "firebase/firestore"
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged
} from "firebase/auth"
import swal from 'sweetalert';
import { create } from "yup/lib/Reference";









const mapUserFromFirebaseAuth = user => {
  console.log("Fc:mapUserFromFirebaseAuth (User) ")
  return null
}

export const onAuthStateChange = (onChange) => {
  console.log("Fc:onAuthStateChange (onChange) ")

  return null
}



export const createUserProfile = async (userAuthenticated, name) => {
console.log("createUserProfile(userAuthenticated, name)")
  return null;
};


// User Registration

export const userRegistration = async (email, password, name) => {
  console.log("Fc: userRegistration = async (email, password, name)")

  return null;

};

// traer nombre user 
export const dataUser = async user => {
    console.log("Fc:  dataUser = async user")
    return null;
  }




// traer Orders user 

export const dataOrders = async () => {
  console.log("Fc: dataOrders = async ()")
  return null
}

// mandar compra a firebase

export const buy = async (paquete) => {
  console.log ("Fc:  buy = async (paquete)")
  return null
}


// Sign-in with Email/Password
export const loginLocal = async (email, password) => {

  console.log("Fc:  loginLocal = async (email, password) ")

  return null
};

export const signOutUser = () => {
  console.log("Fc: signOutUser")
  return null
}

// Google Sign-in

// const providerGoogle = new GoogleAuthProvider();





export const resetPassword = () => {
  console.log("Fc: resetPassword")
  return null
}

export const signInGoogle = () => {
  console.log("Fc: signInGoogle")
  return null
}


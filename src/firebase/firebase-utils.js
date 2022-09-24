
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
import { firebaseConfig } from "./firebase-config";
import { create } from "yup/lib/Reference";




const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const mapUserFromFirebaseAuth = user => {
  const { email, name, photoURL } = user;

  return {
    name,
    email,
    photoURL

  }
}
export const auth = getAuth(app);


export const onAuthStateChange = (onChange) => {

  return onAuthStateChanged(auth, async _user => {
    const user = await dataUser(_user)
    const finalyUser = mapUserFromFirebaseAuth(user)
    onChange(finalyUser)
  })
}



export const createUserProfile = async (userAuthenticated, name) => {
  const userReference = doc(db, `users/${userAuthenticated.uid}`)

  const result = await getDoc(userReference)
  if (!result.exists()) {
    const { email, photoURL } = userAuthenticated;

    try {
      await setDoc(userReference, {
        photoURL,
        name,
        createAt: new Date(),
        email
      })
    } catch (error) {
      console.log({ error })
    }
  }
  const { photoURL } = userAuthenticated;
  if (result.exists() && photoURL) {
    try {
      await setDoc(userReference, {
        photoURL

      })
    } catch (error) {
      console.log({ error })
    }
  }

  return userReference;
};


// User Registration

export const userRegistration = async (email, password, name) => {

  const res = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = res.user;

  await sendEmailVerification(user, {
    url: "http://localhost:3000"
  })
  swal({
    title: `Se envio un correo de verificacion a ${email}`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    icon: 'success',
    timer: 2000
  })
  localStorage.setItem("userName", user)
  createUserProfile(user, name)

  return res;

};

// traer nombre user 
export const dataUser = async user => {

  const docRef = doc(db, `users/${auth.currentUser.uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

}


// traer Orders user 

export const dataOrders = async () => {
  const q = await query(collection(db, `users/${auth.currentUser.uid}/orders`))

  const querySnapshot = await getDocs(q);
  const ordenes = []
  querySnapshot.forEach(async (doc) => {
    ordenes.push(await doc.data())
  }

  );
  return ordenes
}

// mandar compra a firebase

export const buy = async (paquete) => {
  const userReference = doc(db, `users/${auth.currentUser.uid}/orders/${paquete.idOrder}`)
  const result = await getDoc(userReference)
  if (!result.exists()) {

    try {
      await setDoc(userReference, {
        paquete: paquete.compra,
        createAt: new Date(),
        id: paquete.idOrder
      })
    } catch (error) {
      console.log({ error })
    }
  }
}


// Sign-in with Email/Password
export const loginLocal = async (email, password) => {

  try {

    const user = signInWithEmailAndPassword(auth, email, password)


  } catch (err) {
    console.log(err)
   
  }

};

export const signOutUser = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

// Google Sign-in

const providerGoogle = new GoogleAuthProvider();

export const signInGoogle = () => {

  return signInWithPopup(auth, providerGoogle)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      createUserProfile(user, user.displayName)
      return user
    }).catch((error) => {

      console.log(error)
    });

}


//reset passsword
export const resetPassword = async (email,reset) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login"
    });
    alert(`Se envio un correo de recuperacion de contraseña a ${email}`)
  } catch (err) {
    if (err.code == "auth/user-not-found")   {swal({
      title: 'El email no tiene una cuenta creada',
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      },
      timer: 1500
  })
  reset({values:{password:"",email:""}})

}
};
}



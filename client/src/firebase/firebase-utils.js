import { useSelector } from "react-redux"


const urlRailway="https://react-nucba-production.up.railway.app"

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

  const url = `${urlRailway}/user`;

  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password, firstname: name }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const response = await data.json()
  console.log("respuesta del servidor", response)


  return response;

};

// traer nombre user 
export const dataUser = async user => {
  const url = `${urlRailway}/user`
  const data = await fetch(url);
  const response = await data.json()
  return response;
}




// traer Orders user 

export const dataOrders = async (id) => {

  const url = `${urlRailway}/user/order/${id}`
  const data = await fetch(url);
  const response = await data.json()
  console.log("Ordenes:", response)
  return response.orders
}

// mandar compra a firebase

export const buy = async (paquete, user) => {

  const url = `${urlRailway}/order`
  const { buys } = paquete
  const finalBuys = buys.map(({id, ...buy}) => buy)
  console.log("fianlBuys",finalBuys)
  const { id } = user
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ buys: finalBuys, shipping: false, userId: id }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const response = await data.json()

  console.log("Respuesta del servidor:", response)
  console.log(paquete)

  return response
}



// Sign-in with Email/Password
export const loginLocal = async (email, password) => {
  const url = `${urlRailway}/user/login`
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const response = await data.json()



  return response;
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


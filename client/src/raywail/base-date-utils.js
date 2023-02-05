import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"

const urlRailway = "https://react-nucba-production.up.railway.app"









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
  return response.orders
}

export const updateStock = async (id,stockNew) => {
  const url = `${urlRailway}/product/${id}`

  const data = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ id, stock: stockNew }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const response = await data.json()

  return response;
  

}


export const buy = async (paquete, user) => {

  const url = `${urlRailway}/order`

  const { buys } = paquete

  buys.map(({ id,stock,quantity}) => {
    const newStock = stock-quantity
    updateStock(id,newStock)

  })
  
    
  const finalBuys = buys.map(({ id,stock, ...buy }) => buy)
  const { id } = user
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ buys: finalBuys, shipping: false, userId: id }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const response = await data.json()


  return response
}

//idCategory, stock

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





export const resetPassword = async (email, password) => {

  const url = `${urlRailway}/user/${email}`

  const data = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const response = await data.json()

  return response;
}

export const signInGoogle = () => {
  

  swal({
    position: 'top-end',
    icon: 'success',
    title: 'Proximamente en uso!',
    showConfirmButton: false,
    timer: 1500
  })
 

  return null
}

export const categoryArray = async () => {
  const url = `${urlRailway}/category`
  const data = await fetch(url)
  const {categorys} = await data.json()

  return categorys;
}

export const categoryById = async (id) => {
  const url = `${urlRailway}/category/${id}`
  const data = await fetch(url)
  const category = await data.json()

  return category;
}




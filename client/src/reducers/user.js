import React from 'react'

const initialState = null
const userNull = {
  name:"",
  email:"",
  photoURL:""
}
export function user(state = initialState, action) {

  switch (action.type) {

    case 'login':
      localStorage.setItem("user", JSON.stringify(action.value))

      return ({...action.value })
    case 'logout':
      localStorage.removeItem("user")

      return (userNull)

      case 'load-user-localStorage':
        
        const value = localStorage.getItem("user")
        return value ? JSON.parse(value) : userNull

    default:
      return state
  }

}

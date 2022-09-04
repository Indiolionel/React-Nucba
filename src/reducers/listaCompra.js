import { createContext } from "react";
import { addItemCart, removeItemCart } from "../constants/utils";

export default createContext(null);

export function listaCompra(state = [], action) {

    switch (action.type) {
  
      case 'add':
        console.log("state"+state)
        const list = addItemCart(state, action.value)
        
        localStorage.setItem("list", JSON.stringify(list))
        return list
  
      case 'delete':
    
        localStorage.removeItem("list")
        return []

        case 'delete-row':
          const deleteRow = removeItemCart(state, action.value.id)
          localStorage.setItem("list", JSON.stringify(deleteRow))
          return deleteRow 
    
      case 'load-from-localStorage':
        const value = localStorage.getItem("list")
        
        return value ? JSON.parse(value) : state
  
      default:
        return state
    }
  }

  
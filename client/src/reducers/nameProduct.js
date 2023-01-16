export function nameProducto(state = "", action) {

    switch (action.type) {
  
      case 'producto-filtrado':
        return action.value
  
  
      default:
        return state
    }
  }
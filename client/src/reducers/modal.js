

export function modal(state = false, action) {

    switch (action.type) {
  
      case 'change':
        
        return action.value
  
  
      default:
        return state
    }
  }
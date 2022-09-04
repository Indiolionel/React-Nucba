

export function modal(state = false, action) {

    switch (action.type) {
  
      case 'change':
        console.log("state"+state)
        
        return action.value
  
  
      default:
        return state
    }
  }
export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){ //try to keep state variables centralized here
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'set_contacts':

      return {
        ...store, // ... creates a copy, then adjusts the selected info (contacts), leaving the rest unedited
        contacts: action.payload // updates the contacts key in the store with the entire array
      };
    default:
      throw Error('Unknown action.');
  }    
}

export const initialStore = () => {
  return {
    message: null,

    adminAuth: Boolean(localStorage.getItem("adminToken")),
    administrator: null,

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
      },
    ],
    mentorAuth: false
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

      case 'set_mentor_auth':
      return {
        ...store,
        mentorAuth: action.payload
      };

      
    case 'add_task':

    case "add_task": {
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };
    }

    case "admin_login":
      return {
        ...store,
        adminAuth: true,
        administrator: action.payload,
      };

    case "admin_logout":
      return {
        ...store,
        adminAuth: false,
        administrator: null,
      };

    default:
      return store;
  }
}

const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    permission: JSON.parse(localStorage.getItem("permission") || "[]"),
    firstname: localStorage.getItem("firstName") || null,
    lastname: localStorage.getItem("lastName") || null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          token: action.payload.token,
          role: action.payload.role,
          permission: action.payload.permission,
          firstname: action.payload.firstName,
          lastname:action.payload.lastName,
        };
  
      case "LOGOUT":
        return {
          token: null,
          role: null,
          permission: [],
          firstName: null,
          lastName:null,
        };
  
      default:
        return state;
    }
  };
  
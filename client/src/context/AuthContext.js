import { createContext, useEffect, useReducer } from "react";

const INTIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INTIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCES":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INTIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // anything in locaStorage must be ((String))
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

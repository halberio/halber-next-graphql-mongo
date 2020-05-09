import React, { useReducer, useContext, createContext, useEffect } from "react";

// @ts-ignore
export const UserContext = createContext();
let initialState = {
  user: null,
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
export const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export const useDispatchUser = (): any => useContext(UserContext);

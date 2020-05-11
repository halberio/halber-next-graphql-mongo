import React, { useReducer, useContext, createContext } from "react";

// @ts-ignore
export const UserContext = createContext();
let initialState = {
  user: null,
  isLoggedIn:false
};
const reducer = (state: any, action: any) => {
  console.log(`%c ${action.type}`, ' color: #0B698F; font-weight:bold')
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.user,
        token:action.user.token,
        isLoggedIn:true
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn:false
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
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
export const useDispatchUser = (): any => {
 
  return useContext(UserContext);
};

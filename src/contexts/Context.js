import { createContext, useState } from "react";
// import localStorageService from "../services/localStorageService";

export const Context = createContext();

function ContextProvider({ children }) {
  // const [state,dispatch] = useReducer(reducer, initialState)
  //   const [isAuthenticated, setIsAuthenticated] = useState(
  //     localStorageService.getToken()
  //   );
  //   const [user, setUser] = useState({});
  const [id, setId] = useState("");
  return <Context.Provider value={{ id, setId }}>{children}</Context.Provider>;
}

export default ContextProvider;

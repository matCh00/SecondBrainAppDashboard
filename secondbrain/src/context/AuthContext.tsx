import { createContext, Dispatch, SetStateAction, useState } from "react";

const IAuthContextState = { 
  loggedIn: false,
  setLoggedIn: () => {}
}


export const AuthContext = createContext<IAuthContextType>(IAuthContextState);


export const AuthProvider = ({children}: any) => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};


export type IAuthContextType = { 
  loggedIn: boolean; 
  setLoggedIn: Dispatch<SetStateAction<boolean>>; 
}

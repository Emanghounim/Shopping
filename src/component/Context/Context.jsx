import { createContext, useState } from "react";

export const ContextProvider = createContext();

export function ContextProviderComponent({ children }) {
  const [loginContext, setLoginContext] = useState(
    
    localStorage.getItem("useTokken") ?  localStorage.getItem("useTokken"):null 
   );

  return (
    <ContextProvider.Provider value={{ loginContext, setLoginContext }}>
      {children}
    </ContextProvider.Provider>
  );
}

export default ContextProviderComponent;

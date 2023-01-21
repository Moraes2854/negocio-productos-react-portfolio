import { createContext, useContext, useState } from "react";

interface LoadingContextInterface {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}


const LoadingContext = createContext<LoadingContextInterface>({
  loading: false,
  setLoading: ()=>{},
});

export const LoadingProvider = ({ children }:any) => {

  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export const useLoading = () =>{
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
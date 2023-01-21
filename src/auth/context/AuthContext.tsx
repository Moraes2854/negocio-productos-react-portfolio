import { createContext, useContext, useState } from "react";

import defaultApi from "../../api/defaultApi";
import { fireErrorMessage, fireSuccessMessage } from "../../common/helpers";
import { AuthResponse } from "../interfaces/AuthResponse";
import { User } from "../interfaces/User";

interface AuthContextInterface {
  closeModal:()=>void;
  isLoginModalOpen:boolean,
  login:(email:string, password:string)=>Promise<void>;
  logout:()=>void;
  openModal:()=>void;
  user:User|null;
}


const AuthContext = createContext<AuthContextInterface>({
  closeModal:()=>{},
  isLoginModalOpen: false,
  login:async()=>{},
  logout:()=>{},
  openModal:()=>{},
  user: null,
});

export const AuthProvider = ({ children }:any) => {
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [ user, setUser ] = useState<User|null>(null)
  
  const openModal = () => setIsLoginModalOpen(true);
  const closeModal = () => setIsLoginModalOpen(false);

  const login = async (email:string, password:string) => { 

    try {
      const { data } = await defaultApi.post<AuthResponse>('/auth/login', {email, password});
      const { token, ...user } = data;
      setUser(user);
      localStorage.setItem('token', token);
      fireSuccessMessage(`Conectado!`, 4000);
    } catch (err:any) {
      fireErrorMessage(err.response.data.message, 3000);
      setUser(null);
      localStorage.removeItem('token');
    }

    setIsLoginModalOpen(false);
  }

  const logout = () => {
    fireSuccessMessage('Desconectado!', 3000);
    setUser(null);
    localStorage.removeItem('token');
  }

  const value:AuthContextInterface = { user, isLoginModalOpen, login, logout, openModal, closeModal };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
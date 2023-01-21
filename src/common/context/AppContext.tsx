import { createContext, useContext, useState } from "react";
import { Product } from "../../products/interfaces";

interface AppContextInterface {
  currentProduct:Product|null;
  setCurrentProduct:React.Dispatch<React.SetStateAction<Product | null>>;

  isSearchProductModalOpen: boolean;
  openSearchProductModal: ()=>void;
  closeSearchProductModal: ()=>void;

  isUpdateProductModalOpen: boolean;
  openUpdateProductModal: ()=>void;
  closeUpdateProductModal: ()=>void;

  isCreateProductModalOpen: boolean;
  openCreateProductModal: ()=>void;
  closeCreateProductModal: ()=>void;

  isDeleteProductModalOpen: boolean;
  openDeleteProductModal: ()=>void;
  closeDeleteProductModal: ()=>void;

  isSearchProductByNameModalOpen: boolean;
  openSearchProductByNameModal: ()=>void;
  closeSearchProductByNameModal: ()=>void;
}


const AppContext = createContext<AppContextInterface>({
  currentProduct:null,
  setCurrentProduct:()=>{},

  isSearchProductModalOpen: false,
  openSearchProductModal: ()=>{},
  closeSearchProductModal: ()=>{},

  isUpdateProductModalOpen: false,
  openUpdateProductModal: ()=>{},
  closeUpdateProductModal: ()=>{},

  isCreateProductModalOpen: false,
  openCreateProductModal: ()=>{},
  closeCreateProductModal: ()=>{},

  isDeleteProductModalOpen: false,
  openDeleteProductModal: ()=>{},
  closeDeleteProductModal: ()=>{},

  isSearchProductByNameModalOpen: false,
  openSearchProductByNameModal: ()=>{},
  closeSearchProductByNameModal: ()=>{},
});

export const AppProvider = ({ children }:any) => {

    const [ currentProduct, setCurrentProduct ] = useState<Product|null>(null);

    const [isSearchProductModalOpen, setIsSearchProductModalOpen] = useState(false);
    const openSearchProductModal = () => setIsSearchProductModalOpen(true);
    const closeSearchProductModal = () => setIsSearchProductModalOpen(false);

    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
    const openUpdateProductModal = () => setIsUpdateProductModalOpen(true);
    const closeUpdateProductModal = () => setIsUpdateProductModalOpen(false);

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const openCreateProductModal = () => setIsCreateProductModalOpen(true);
    const closeCreateProductModal = () => setIsCreateProductModalOpen(false);
    
    const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
    const openDeleteProductModal = () => setIsDeleteProductModalOpen(true);
    const closeDeleteProductModal = () => setIsDeleteProductModalOpen(false);

    const [isSearchProductByNameModalOpen, setIsSearchProductByNameModalOpen] = useState(false);
    const openSearchProductByNameModal = () => setIsSearchProductByNameModalOpen(true);
    const closeSearchProductByNameModal = () => setIsSearchProductByNameModalOpen(false);

    const value = {
        currentProduct,
        setCurrentProduct,

        isSearchProductModalOpen,
        openSearchProductModal,
        closeSearchProductModal,

        isUpdateProductModalOpen,
        openUpdateProductModal,
        closeUpdateProductModal,

        isCreateProductModalOpen,
        openCreateProductModal,
        closeCreateProductModal,

        isDeleteProductModalOpen,
        openDeleteProductModal,
        closeDeleteProductModal,

        isSearchProductByNameModalOpen,
        openSearchProductByNameModal,
        closeSearchProductByNameModal,
    }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () =>{
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error("useApp must be used within AppContext");
  }
  
  return context;
}
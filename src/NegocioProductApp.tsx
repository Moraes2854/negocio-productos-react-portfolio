import { ToastContainer } from 'react-toastify';

import { useLoading } from './common/context/LoadingContext';
import { useAuth } from './auth/context/AuthContext';

import { LoginModal } from './auth/components/LoginModal';
import { LoadingSpinner, CustomNavbar } from './common/components';
import { useNegocioProductApp } from './common/hooks/useNegocioProductApp';

import { CreateProductModal, SearchProductModal, UpdateProductModal, DeleteProductModal, SearchProductByNameModal } from './products/components';

import 'react-toastify/dist/ReactToastify.css';
import './globalStyles.css';

import { useApp } from './common/context/AppContext';

export const NegocioProductApp = () => {
    
    const { user } = useAuth();
    const { loading } = useLoading();

    const { 
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
    } = useApp();

    const { 
        onDownloadBackupButtonClick
    } = useNegocioProductApp();

    return (
        <>
            <CustomNavbar />
            <div className='main d-flex'>
                <>
                    {
                        (loading) 
                        ?
                            <>
                                <LoadingSpinner/>
                            </>
                        :
                        <div className="row w-100">
                            <div className="col d-flex flex-column align-items-center">

                                <button className='mt-2 w-50 btn btn-primary btn-lg' onClick={openSearchProductModal}>Buscar producto</button>
                                
                                {
                                    (user && user.roles.includes('super-user')) && (
                                        <>
                                            <button className='mt-2 w-50 btn btn-primary btn-lg' onClick={openUpdateProductModal}>Actualizar producto</button>
                                            <button className='mt-2 w-50 btn btn-primary btn-lg' onClick={openCreateProductModal}>Crear producto</button>
                                        </>
                                    )
                                }

                               
                               {
                                    (user && user.roles.includes('admin')) && (
                                        <button className='mt-2 w-50 btn btn-danger btn-lg' onClick={openDeleteProductModal}>
                                            Eliminar Producto
                                        </button>
                                    )
                                }

                                <button className='mt-2 w-50 btn btn-primary btn-lg' onClick={openSearchProductByNameModal}>Buscar producto por nombre</button>
                                
                                {
                                    (user && user.roles.includes('super-user')) && (
                                        <button className='mt-2 w-50 btn btn-success btn-lg' onClick={onDownloadBackupButtonClick}>
                                            Descargar copia de seguridad
                                        </button>
                                    )
                                }

                                   
                            </div>
                        </div>
                    }
                </>

                <SearchProductModal isModalOpen={isSearchProductModalOpen} closeModal={closeSearchProductModal}/>
                <UpdateProductModal isModalOpen={isUpdateProductModalOpen} closeModal={closeUpdateProductModal}/>
                <CreateProductModal isModalOpen={isCreateProductModalOpen} closeModal={closeCreateProductModal} />
                <DeleteProductModal isModalOpen={isDeleteProductModalOpen} closeModal={closeDeleteProductModal} />
                <SearchProductByNameModal isModalOpen={isSearchProductByNameModalOpen} closeModal={closeSearchProductByNameModal} />
                <LoginModal />
            </div>
                
            <ToastContainer />
        </>
    );

}
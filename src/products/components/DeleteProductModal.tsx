import { FC } from 'react'
import moment from 'moment';

import { ModalLayout } from '../layout/ModalLayout'
import { useDeleteProductModal } from '../hooks';

interface Props{
    isModalOpen:boolean;   
    closeModal:()=>void; 
}

export const DeleteProductModal:FC<Props> = ({isModalOpen, closeModal}) => {

    const {
        onSubmit,

        inputBarcodeValue,
        onInputBarcodeValueChange,

        currentProduct,
        searchProduct,

        reinitialize,
        onShowModal
    } = useDeleteProductModal();

  return (
    <ModalLayout
        modalTitle='Eliminar Producto'
        isOpen={isModalOpen}
        closeModal={()=>{
            closeModal();
            reinitialize();
        }}
        inputBarcodeValue={inputBarcodeValue}
        onInputBarcodeValueChange={onInputBarcodeValueChange}
        showSearchProductButton
        searchProduct={searchProduct}
        onShowModal={onShowModal}
    >
        {
            (currentProduct) && (
                <>
                    <div className='form-group mt-3'>

                        <div className='text-center'><label> Producto: </label></div> 
                        <input
                            className="custom-input mt-1 text-center"
                            value={currentProduct.name}
                            readOnly
                        />

                        <div className='text-center'><label> Precio: </label></div> 
                        <input
                            className="custom-input mt-1 text-center"
                            value={`$${currentProduct.sell_price}`}
                            readOnly
                        />

                        <div className='text-center'><label> Ultima actualización: </label></div> 
                        <input
                            className="custom-input mt-1 text-center"
                            value={moment(currentProduct.last_update).format('DD/MM/YYYY')}
                            readOnly
                        />
                    </div>

                    <div className="mt-3">
                        <button className='btn btn-danger' onClick={onSubmit}>
                            Eliminar Producto
                        </button>
                    </div>
                </>
            )
        }
    </ModalLayout>
  )
}

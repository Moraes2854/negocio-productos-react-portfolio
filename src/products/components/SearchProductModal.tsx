import React, { FC } from 'react'
import moment from 'moment';

import { ModalLayout } from '../layout/ModalLayout'
import { useSearchProductModal } from '../hooks';

interface Props{
    isModalOpen:boolean;   
    closeModal:()=>void; 
}

export const SearchProductModal:FC<Props> = ({isModalOpen, closeModal}) => {

    const {
        inputBarcodeValue,
        onInputBarcodeValueChange,

        currentProduct,
        searchProduct,

        reinitialize,

        onShowModal
    } = useSearchProductModal();

  return (
    <ModalLayout
        modalTitle='Buscar Producto'
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
                </>
            )
        }
    </ModalLayout>
  )
}

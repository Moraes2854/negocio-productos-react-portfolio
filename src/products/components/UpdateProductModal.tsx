import { FC } from 'react'

import { ModalLayout } from '../layout/ModalLayout'
import { useUpdateProductModal } from '../hooks';

interface Props{
    isModalOpen:boolean;   
    closeModal:()=>void; 
}

export const UpdateProductModal:FC<Props> = ({isModalOpen, closeModal}) => {

    const {
        showChildren,

        inputBarcodeValue,
        onInputBarcodeValueChange,

        updateProductDto,
        searchProduct,
        handleFormChange,

        onSubmit,

        reinitialize,

    } = useUpdateProductModal();

    const { name, sell_price } = updateProductDto;

  return (
    <ModalLayout
        modalTitle='Actualizar Producto'
        isOpen={isModalOpen}
        closeModal={()=>{
            closeModal();
            reinitialize();
        }}
        inputBarcodeValue={inputBarcodeValue}
        onInputBarcodeValueChange={onInputBarcodeValueChange}
        showSearchProductButton
        searchProduct={searchProduct}
    >

        <div className='mt-1'>

            <div className='text-center'><label> Producto: </label></div> 
            <input
                className="custom-input mt-1 text-center"
                name="name"
                value={name}
                onChange={handleFormChange}
                autoComplete='off'
            />

            <div className='text-center'><label> Precio: </label></div> 
            <input
                className="custom-input mt-1 text-center"
                name="sell_price"
                value={sell_price}
                onChange={handleFormChange}
                autoComplete='off'
            />

        </div>
        <div className="mt-3">
            <button className='custom-button' onClick={onSubmit}>
                Guardar producto
            </button>
        </div>

    </ModalLayout>
  )
}

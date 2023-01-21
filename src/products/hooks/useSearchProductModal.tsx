import React, { useState } from 'react'

import { useProduct } from './useProducts';


export const useSearchProductModal = () => {

    const [ inputBarcodeValue, setInputBarcodeValue ] = useState('');

    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => setInputBarcodeValue('')});

    
    const reinitialize = () =>{
        setInputBarcodeValue('');
        setCurrentProduct(null);
    }

    const searchProduct = (value:string) => {
        searchProductQuery(value);
    }  

    const onInputBarcodeValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputBarcodeValue(e.target.value);
    }

    const onShowModal = () => {
        setInputBarcodeValue('');
    }

    return {
        reinitialize,
        currentProduct,
        searchProduct,
        inputBarcodeValue,
        onInputBarcodeValueChange,
        onShowModal,
    }


}

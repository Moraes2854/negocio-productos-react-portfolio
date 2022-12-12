import React, { useEffect, useState } from 'react'

import { useProduct } from './useProducts';


export const useSearchProductModal = () => {

    const [barcode, setBarcode] = useState('');
    const [inputBarcodeValue, setInputBarcodeValue] = useState('');

    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => setInputBarcodeValue('')});

    
    const reinitialize = () =>{
        setBarcode('');
        setInputBarcodeValue('');
        searchProductQuery('');
        setCurrentProduct(null);
    }

    const searchProduct = (value:string) => {
        setBarcode(value);  
        searchProductQuery(value);
    }  

    const onInputBarcodeValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputBarcodeValue(e.target.value);
    }

    const onShowModal = () => {
        setInputBarcodeValue('');
        setBarcode('');
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

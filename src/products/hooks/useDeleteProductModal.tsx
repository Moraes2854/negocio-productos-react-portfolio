import React, { useReducer } from 'react'

import defaultApi from '../../api/defaultApi';
import { useLoading } from '../../common/context/LoadingContext';
import { fireErrorMessage, fireSuccessMessage } from '../../common/helpers';
import { DeleteProductModalActionKind, deleteProductModalReducer, initialStateDeleteProduct } from '../reducers';
import { useProduct } from './useProducts';

const deleteProduct = async( productID:string ):Promise<boolean> => {
    const { data } = await defaultApi.delete<boolean>(`/products/${productID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return data;
}

export const useDeleteProductModal = () => {
    const { setLoading } = useLoading();

    const [{ inputBarcodeValue }, dispatch] = useReducer(deleteProductModalReducer, initialStateDeleteProduct);
    
    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => {
        reinitialize();
    }});
    

    const reinitialize = () =>{
        setCurrentProduct(null);
        dispatch({type:DeleteProductModalActionKind.REINITIALIZE});
    }



    const onSubmit = async() => {
        setLoading(true);

        try {
            await deleteProduct(currentProduct!.id);
            fireSuccessMessage(`El producto ${currentProduct?.name} fué eliminado!`, 4000);
        } catch (error:any) {
            fireErrorMessage(error.response.data.message);
        }
        
        reinitialize();
        setLoading(false);

    }

    const searchProduct = () => {
        dispatch({type:DeleteProductModalActionKind.UPDATE_BARCODE, payload:inputBarcodeValue});

        searchProductQuery(inputBarcodeValue);

    }  

    const onInputBarcodeValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        dispatch({type:DeleteProductModalActionKind.CHANGE_INPUT_BARCODE_VALUE, payload:value})
    }
    
    const onShowModal = () => {
        dispatch({type:DeleteProductModalActionKind.CHANGE_INPUT_BARCODE_VALUE, payload:''})
    }

    return {
        onSubmit,
        currentProduct,
        searchProduct,

        inputBarcodeValue,
        onInputBarcodeValueChange,

        reinitialize,

        onShowModal

    }


}

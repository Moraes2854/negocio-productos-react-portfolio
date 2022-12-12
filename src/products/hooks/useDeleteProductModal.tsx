import React, { useReducer } from 'react'
import { useMutation } from '@tanstack/react-query';

import defaultApi from '../../api/defaultApi';
import { useLoading } from '../../common/context/LoadingContext';
import { sleep, fireErrorMessage, fireSuccessMessage } from '../../common/helpers';
import { DeleteProductModalActionKind, deleteProductModalReducer, initialStateDeleteProduct } from '../reducers';
import { useProduct } from './useProducts';

const deleteProduct = async( productID:string ):Promise<boolean> => {
    await sleep(2);
    const { data } = await defaultApi.delete<boolean>(`/products/${productID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return data;
}

export const useDeleteProductModal = () => {
    const { setLoading } = useLoading();

    const [{barcode, inputBarcodeValue}, dispatch] = useReducer(deleteProductModalReducer, initialStateDeleteProduct);
    
    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => {
        reinitialize();
    }});
    

    const reinitialize = () =>{
        setCurrentProduct(null);
        dispatch({type:DeleteProductModalActionKind.REINITIALIZE});
    }

    const deleteProductMutation = useMutation({
        mutationFn:()=>deleteProduct(currentProduct!.id),
        retry:false,
        onError:(err:any)=>{
            setLoading(false);
            fireErrorMessage(err.response.data.message);
            reinitialize();
        },
        onSuccess:(data)=>{
            setLoading(false);
            if (data){
                fireSuccessMessage(`El producto ${currentProduct?.name} fué eliminado!`, 4000);
                reinitialize();
            }
        }
    });

    const onSubmit = () => {
        setLoading(true);
        deleteProductMutation.mutate();
    }

    const searchProduct = () => {
        dispatch({type:DeleteProductModalActionKind.UPDATE_BARCODE, payload:inputBarcodeValue})
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

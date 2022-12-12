import React, { useEffect, useReducer, useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import { Product, UpdateProductDto } from '../interfaces';
import { useProduct } from './useProducts';
import defaultApi from '../../api/defaultApi';
import { fireErrorMessage, fireSuccessMessage, compareProductAndUpdateDto, sleep } from '../../common/helpers';
import { useLoading } from '../../common/context/LoadingContext';
import { initialStateUpdateProduct, UpdateProductModalActionKind, updateProductReducer } from '../reducers';


const updateProduct = async( productID:string, updateProductDto:UpdateProductDto ):Promise<Product> => {
    await sleep(2);
    const { data } = await defaultApi.patch<Product>(`/products/${productID}`, {...updateProductDto}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return data;
}

export const useUpdateProductModal = () => {
    
    const [showChildren, setShowChildren] = useState(false);

    const { setLoading } = useLoading();
    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => { reinitialize() }});

    const [{inputBarcodeValue, updateProductDto}, dispatch] = useReducer(updateProductReducer, initialStateUpdateProduct);

    const reinitialize = () =>{
        dispatch({type:UpdateProductModalActionKind.REINITIALIZE});
        setCurrentProduct(null);
    }

    const searchProduct = () => {
        searchProductQuery(inputBarcodeValue);
        dispatch({type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:''});
    }

    const onInputBarcodeValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:e.target.value});
    }
    
    const updateProductMutation = useMutation({
        mutationFn:()=>updateProduct(currentProduct!.id, updateProductDto!),
        retry:false,
        onError:(err:any)=>{
            setLoading(false);
            fireErrorMessage(err.response.data.message);
        },
        onSuccess:(data)=>{
            setLoading(false);
            setCurrentProduct(data);
            fireSuccessMessage(`El producto ${data.name} fué actualizado!`, 4000);
            dispatch({type:UpdateProductModalActionKind.REINITIALIZE});
        }
    });

    const onSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (updateProductDto && currentProduct){
            
            setLoading(true);
            if ( currentProduct.barcode !== inputBarcodeValue ) {
                setLoading(false);
                return fireErrorMessage('No se puede actualizar el código de barras de un producto');
            }

            if (updateProductDto.sell_price && updateProductDto.sell_price < 1 ) return fireErrorMessage('El precio tienen que ser mayor a 0');
            
            if (!compareProductAndUpdateDto(currentProduct, updateProductDto)) updateProductMutation.mutate();
            else {
                setLoading(false);
                return fireErrorMessage('Se debe ingresar algun cambio en el producto');
            }
        }
        else fireErrorMessage('Se debe buscar un producto');
         
    }

    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type:UpdateProductModalActionKind.CHANGE_UPDATE_PRODUCT_DTO,
            payload:{
                name,
                value
            }
        })
    }

    const onShowModal = () => {
        dispatch({type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:''});
    }

    useEffect(()=>{

        if (currentProduct){

            const { id, last_update, ...dto } = currentProduct;

            dispatch({
                type:UpdateProductModalActionKind.SET_UPDATE_PRODUCT_DTO,
                payload:dto
            });

            dispatch({type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:currentProduct.barcode});
            
            setShowChildren(true);
        }

        else setShowChildren(false);

    }, [currentProduct]);


    return {
        showChildren,

        searchProduct,
        inputBarcodeValue,
        onInputBarcodeValueChange,
        updateProductDto,
        handleFormChange,
        onSubmit,
        
        reinitialize,

        onShowModal
    }

}



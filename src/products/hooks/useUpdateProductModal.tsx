import React, { useEffect, useReducer, useState } from 'react'

import { fireErrorMessage, fireSuccessMessage, compareProductAndUpdateDto } from '../../common/helpers';
import { initialStateUpdateProduct, UpdateProductModalActionKind, updateProductReducer } from '../reducers';
import { Product, UpdateProductDto } from '../interfaces';
import { useLoading } from '../../common/context';
import { useProduct } from './useProducts';
import defaultApi from '../../api/defaultApi';


const updateProduct = async( productID:string, updateProductDto:UpdateProductDto ):Promise<Product> => {
    const { data } = await defaultApi.patch<Product>(`/products/${productID}`, {...updateProductDto}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return data;
}

export const useUpdateProductModal = () => {
    
    const [ showChildren, setShowChildren ] = useState(false);

    const { setLoading } = useLoading();
    const { searchProductQuery, currentProduct, setCurrentProduct } = useProduct({onError:(err:any) => { reinitialize() }});

    const [{ inputBarcodeValue, updateProductDto }, dispatch] = useReducer(updateProductReducer, initialStateUpdateProduct);

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
    
    const onSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (updateProductDto && currentProduct){
            
            setLoading(true);
            if ( currentProduct.barcode !== inputBarcodeValue ) {
                setLoading(false);
                return fireErrorMessage('No se puede actualizar el código de barras de un producto');
            }

            if (updateProductDto.sell_price && updateProductDto.sell_price < 1 ) return fireErrorMessage('El precio tienen que ser mayor a 0');
            
            if (!compareProductAndUpdateDto(currentProduct, updateProductDto)) {
                try {

                    const product = await updateProduct(currentProduct!.id, updateProductDto!);
                    setLoading(false);
                    setCurrentProduct(product);
                    fireSuccessMessage(`El producto ${product.name} fué actualizado!`, 4000);
                    dispatch({type:UpdateProductModalActionKind.REINITIALIZE});

                } catch (error:any) {
                    setLoading(false);
                    fireErrorMessage(error.response.data.message);
                }


            }

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

        else {
            setShowChildren(false);
            dispatch({type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:''});
        }

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



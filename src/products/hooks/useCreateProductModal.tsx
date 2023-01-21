import React, { useReducer } from 'react'

import { compareObjects, fireErrorMessage, fireSuccessMessage } from '../../common/helpers';
import { CreateProductModalActionKind, createProductModalReducer, initialStateCreateProduct } from '../reducers';
import { Product, CreateProductDto } from '../interfaces';
import { useLoading } from '../../common/context';
import defaultApi from '../../api/defaultApi';

const createProduct = async( createProductDto:CreateProductDto ):Promise<Product> => {
    const { data } = await defaultApi.post<Product>(`/products`, {...createProductDto}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return data;
}

const initialDto:CreateProductDto = {
    barcode:'',
    name:'',
    buy_price:0,
    sell_price:0,
}

export const useCreateProductModal = () => {

    const { setLoading } = useLoading();
    
    const [ dto, dispatch ] = useReducer(createProductModalReducer, initialStateCreateProduct);


    const reinitialize = () =>{
        dispatch({type:CreateProductModalActionKind.REINITIALIZE});
    }


    const onSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        if (dto.sell_price === 0) return fireErrorMessage('Se debe ingresar un precio de venta mayor a 0');
        if (!compareObjects(dto, initialDto)) {

            try {
                setLoading(true);
    
                const product = await createProduct(dto);
    
                setLoading(false);

                fireSuccessMessage(`El producto ${product.name} fué creado exitosamente!`, 4000);

                reinitialize();
                
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

    const setBarcode = (value:string) => {
        dispatch({
            type:CreateProductModalActionKind.CHANGE_FORM, 
            payload:{name:'barcode', value}
        })
    }
    
    const handleFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        dispatch({
            type:CreateProductModalActionKind.CHANGE_FORM, 
            payload:{name:e.target.name, value:e.target.value}
        });
    }


    return {
        createProductDto:dto,
        setBarcode,
        handleFormChange,
        onSubmit,
        reinitialize,

    }
}

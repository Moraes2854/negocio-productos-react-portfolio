import React, { useReducer, useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import { Product, CreateProductDto } from '../interfaces';
import defaultApi from '../../api/defaultApi';
import { sleep, compareObjects, fireErrorMessage, fireSuccessMessage } from '../../common/helpers';
import { CreateProductModalActionKind, createProductModalReducer, initialStateCreateProduct } from '../reducers';
import { useLoading } from '../../common/context/LoadingContext';

const createProduct = async( createProductDto:CreateProductDto ):Promise<Product> => {
    await sleep(2);
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
    
    const [ state, dispatch ] = useReducer(createProductModalReducer, initialStateCreateProduct);


    const reinitialize = () =>{
        dispatch({type:CreateProductModalActionKind.REINITIALIZE});
    }

    const createProductMutation = useMutation({
        mutationFn:()=>createProduct(state),
        retry:false,
        onError:(err:any)=>{
            setLoading(false);
            fireErrorMessage(err.response.data.message);
        },
        onSuccess:(data)=>{
            setLoading(false);
            fireSuccessMessage(`El producto ${data.name} fué creado exitosamente!`, 4000);
            reinitialize();
        }
    });

    const onSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (state.sell_price === 0) return fireErrorMessage('Se debe ingresar un precio de venta mayor a 0');
        if (!compareObjects(state, initialDto)) {
            setLoading(true);
            createProductMutation.mutate();
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

        // setCreateProductDto({
        //   ...createProductDto,
        //   [e.target.name]:(e.target.name === "buy_price" || e.target.name === "sell_price") ? Number(e.target.value.replace(/\D/g, '')) : e.target.value
        // });
    }


    return {
        createProductDto:state,
        setBarcode,
        handleFormChange,
        onSubmit,
        reinitialize,

    }
}

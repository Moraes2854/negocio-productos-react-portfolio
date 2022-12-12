import { useState } from 'react';

import defaultApi from '../../api/defaultApi';
import { Product } from '../interfaces';
import { useLoading } from '../../common/context/LoadingContext';
import { fireErrorMessage, sleep } from '../../common/helpers';
import { useApp } from '../../common/context/AppContext';

const getProduct = async( barcode:string ):Promise<Product|null> => {
    if (barcode !== ''){
        await sleep(2);
        const { data } = await defaultApi.get<Product>(`/products/${barcode}`);
        return data;
    }
    else return null;
}

interface Props{
    onError:(err:any)=>void;
}


export const useProduct = ({ onError }:Props) => {
    
    const {
        currentProduct,
        setCurrentProduct,
    } = useApp();


    const { setLoading } = useLoading();

    const searchProductQuery= (barcode:string) => {

        setLoading(true);

        getProduct(barcode)
        .then((product)=>{
            setCurrentProduct(product);
            setLoading(false);
        })
        .catch((err)=>{
            setLoading(false);
            fireErrorMessage(err.response.data.message);
        })

    }   


    return {
        searchProductQuery,
        currentProduct,
        setCurrentProduct,
    };
}
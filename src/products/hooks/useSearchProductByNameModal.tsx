import React, { useEffect, useReducer } from 'react'

import { fireErrorMessage } from '../../common/helpers';
import { initialStateSearchProductByNameProduct, SearchProductByNameModalActionKind, searchProductByNameModalReducer } from '../reducers'
import { Product } from '../interfaces';
import { useAppContext } from '../../common/context';
import defaultApi from '../../api/defaultApi';


const getProducts = async( search:string ):Promise<Product[]> => {
    const { data } = await defaultApi.get<Product[]>(`/products/?limit=100&search=${search}`);
    return data;
}

export const useSearchProductByNameModal = () => {


    const { currentProduct } = useAppContext();
    const [ state, dispatch ] = useReducer(searchProductByNameModalReducer, initialStateSearchProductByNameProduct);
    const { searchIsLoading, searchbarInputValue, products } = state;

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({
            type:SearchProductByNameModalActionKind.CHANGE_SEARCH_INPUT_VALUE,
            payload:e.target.value
        })
    }

    const onSearch = async() => {
        try {
            
            if (searchbarInputValue === ""){
                dispatch({ type:SearchProductByNameModalActionKind.SET_PRODUCTS, payload:[] });
                fireErrorMessage(`Se debe ingresar algun contenido para buscar`);
                return;
            }

            dispatch({ type:SearchProductByNameModalActionKind.SET_SEARCH_LOADING, payload:true });        

            const getProductsResponse = await getProducts(searchbarInputValue);

            dispatch({ type:SearchProductByNameModalActionKind.SET_SEARCH_LOADING, payload:false });

            dispatch({ type:SearchProductByNameModalActionKind.SET_PRODUCTS, payload:getProductsResponse });

        } catch (error:any) {

            if (error.response.data.message){
                fireErrorMessage(error.response.data.message);
                dispatch({ type:SearchProductByNameModalActionKind.SET_ERROR_ON_SEARCH, payload:true })
                dispatch({ type:SearchProductByNameModalActionKind.SET_ERROR_MESSAGE, payload:error.response.data.message })
            }
        
            dispatch({
                type:SearchProductByNameModalActionKind.SET_SEARCH_LOADING,
                payload:false
            });
        }
    }

    const onOpenModal = () => {
        const auxProducts = [...products];

        dispatch({
            type:SearchProductByNameModalActionKind.REINITIALIZE
        });

        dispatch({
            type:SearchProductByNameModalActionKind.SET_PRODUCTS,
            payload:auxProducts
        });

    }

    useEffect(()=>{
        if (currentProduct){
            if (products.find((p)=>p.id === currentProduct.id)){
                dispatch({
                    type:SearchProductByNameModalActionKind.SET_PRODUCTS,
                    payload:[...products.filter((p)=>p.id !== currentProduct.id), currentProduct].sort((a, b) => a.name.localeCompare(b.name)),
                });
            }
        }
    }, [currentProduct]);




    return {
        searchIsLoading,
        searchbarInputValue,

        onInputChange,
        onSearch,
        products,

        onOpenModal

    }


}

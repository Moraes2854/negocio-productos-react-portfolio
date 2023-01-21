import { useEffect, useReducer } from "react"
import { v4 as uuidv4 } from 'uuid';

import { fireErrorMessage } from '../../common/helpers';
import { Product } from '../../products/interfaces';
import { ProductSale } from "../interfaces";
import { saleReducer, initialStateSaleReducer, SaleActionKind } from '../reducers/saleReducer';
import defaultApi from '../../api/defaultApi';

const getProduct = async( barcode:string ):Promise<Product> => {
    const { data } = await defaultApi.get<Product>(`/products/${barcode}`);
    return data;
}


export const useSalesPage = () => {

    //NO SE PUEDE USAR USELOADING PORQUE SE ROMPE AL BUSCAR PRODUCTO ...............

    const [ sale, dispatch ] = useReducer(saleReducer, initialStateSaleReducer);

    
    const addProductSale = ( barcode:string, amount:number ) => {

        if (barcode === '') return fireErrorMessage('Ingresar un código de barras válido');

        getProduct(barcode)
        .then((product)=>{
            const productSale:ProductSale = {
                product,
                amount,
                id:uuidv4(),
                total:product.sell_price * amount
            };

            dispatch({ type:SaleActionKind.ADD_PRODUCTS_SALES, payload:productSale })
        })
        .catch((err)=>{
            fireErrorMessage(err.response.data.message);
        })
    }

    const reinitialize = () => {
        dispatch( { type:SaleActionKind.REINITIALIZE } );
    }

    const deleteProductSale = ( id:string ) => {
        dispatch({ type: SaleActionKind.REMOVE_PRODUCT_SALE, payload:id } );
    }

    const updateAmountOfProductSale = ( id:string, newAmount:number ) => {
        dispatch({ type: SaleActionKind.UPDATE_AMOUNT_PRODUCT_SALE, payload:{ id, newAmount} } );
    }

    const updateSellPriceOfProductSale = ( id:string, newSellPrice:number ) => {
        dispatch({ type: SaleActionKind.UPDATE_SELL_PRICE_PRODUCT_SALE, payload:{ id, newSellPrice} } );
    }


    const onAddSale = () => {

        const barcode = prompt('Código de barras: ');
        if ( !barcode ) return fireErrorMessage('Se debe ingresar un código de barras');
    
        if ( barcode === '0') return addCustomProductSale();

        const amount = Number(prompt('Ingresar cantidad'));
        if ( !amount || isNaN(amount) ) return fireErrorMessage('Se debe ingresar una cantidad válida');
        if ( amount < 1 ) return fireErrorMessage('Se debe ingresar una cantidad mayor a 0');
    
    
        return addProductSale(barcode, amount);
    
    }

    const addCustomProductSale = () => {
        const name = prompt('Ingresar nombre');
        
        if ( !name ) return fireErrorMessage('Se debe ingresar un nombre para el producto');

        const sell_price = Number(prompt('Ingresar precio por unidad'));
        if ( !sell_price || isNaN(sell_price) ) return fireErrorMessage('Se debe ingresar un precio válido');
        if ( sell_price < 1 ) return fireErrorMessage('Se debe ingresar un precio mayor a 0');
        
        const amount = Number(prompt('Ingresar cantidad'));
        if ( !amount || isNaN(amount) ) return fireErrorMessage('Se debe ingresar una cantidad válida');
        if ( amount < 1 ) return fireErrorMessage('Se debe ingresar una cantidad mayor a 0');

        const product:Product = {
            barcode:'0',
            buy_price:0,
            enabled:true,
            id:uuidv4(),
            last_update:new Date(),
            name:name.toUpperCase(),
            sell_price,
        }

        const productSale:ProductSale = {
            product,
            amount,
            id:uuidv4(),
            total:product.sell_price * amount
        };

        return dispatch({ type:SaleActionKind.ADD_PRODUCTS_SALES, payload:productSale })
    }

    useEffect(()=>{
        const total = sale.productsSales.reduce((accumulated, current) => accumulated + (current.amount * current.product.sell_price ), 0);
        dispatch( { type:SaleActionKind.SET_TOTAL, payload:total } );
    }, [sale.productsSales]);

    return {
        sale,
        addProductSale,
        deleteProductSale,
        updateAmountOfProductSale,
        reinitialize,
        onAddSale,
        updateSellPriceOfProductSale
    }
}

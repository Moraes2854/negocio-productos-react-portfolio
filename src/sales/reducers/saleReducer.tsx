import { ProductSale, Sale } from "../interfaces/Sale";

export enum SaleActionKind {
    ADD_PRODUCTS_SALES = "ADD_PRODUCTS_SALES",
    REINITIALIZE = "REINITIALIZE",
    REMOVE_PRODUCT_SALE = "REMOVE_PRODUCT_SALE",
    SET_PRODUCTS_SALES = "SET_PRODUCTS_SALES",
    SET_TOTAL = "SET_TOTAL",
    UPDATE_AMOUNT_PRODUCT_SALE = "UPDATE_AMOUNT_PRODUCT_SALE",
    UPDATE_SELL_PRICE_PRODUCT_SALE = "UPDATE_SELL_PRICE_PRODUCT_SALE",
}

type ActionType = 
    { type:SaleActionKind.ADD_PRODUCTS_SALES, payload:ProductSale }|
    { type:SaleActionKind.REINITIALIZE }|
    { type:SaleActionKind.REMOVE_PRODUCT_SALE, payload:string }|
    { type:SaleActionKind.SET_PRODUCTS_SALES, payload:ProductSale[] }|
    { type:SaleActionKind.SET_TOTAL, payload:number }|
    { type:SaleActionKind.UPDATE_AMOUNT_PRODUCT_SALE, payload:{id:string, newAmount:number} }|
    { type:SaleActionKind.UPDATE_SELL_PRICE_PRODUCT_SALE, payload:{ id:string, newSellPrice:number } }

export const initialStateSaleReducer:Sale = {
    productsSales:[],
    total:0
}

export const saleReducer = ( state:Sale, action:ActionType ):Sale => {

    switch (action.type) {
        case SaleActionKind.ADD_PRODUCTS_SALES:
            return {
                ...state,
                productsSales:[...state.productsSales, action.payload]
            }
        case SaleActionKind.REMOVE_PRODUCT_SALE:
            return {
                ...state,
                productsSales:state.productsSales.filter( (productSale)=>productSale.id !== action.payload )
            }
        case SaleActionKind.REINITIALIZE:
            return {
                ...initialStateSaleReducer
            }
        case SaleActionKind.SET_PRODUCTS_SALES:
            return {
                ...state,
                productsSales:action.payload
            }
        case SaleActionKind.SET_TOTAL:
            return {
                ...state,
                total:action.payload
            }
        case SaleActionKind.UPDATE_AMOUNT_PRODUCT_SALE:

            const newProductsSales = state.productsSales.map( (productSale) => {

                if (productSale.id === action.payload.id) {
                    return {
                        ...productSale,
                        amount:action.payload.newAmount,
                        total:action.payload.newAmount * productSale.product.sell_price,
                    }
                }

                return productSale;
            });

        
            return {
                ...state,
                productsSales:newProductsSales,
            }

        case SaleActionKind.UPDATE_SELL_PRICE_PRODUCT_SALE:

            const productsSales = state.productsSales.map( (productSale) => {

                if (productSale.id === action.payload.id) {
                    return {
                        ...productSale,
                        product:{
                            ...productSale.product,
                            sell_price:action.payload.newSellPrice,
                        },
                        total:productSale.amount * action.payload.newSellPrice
                    }
                }

                return productSale;
            });

            return{
                ...state,
                productsSales
            }
        
        default:
            return state;
    }

}

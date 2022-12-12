import { Product } from "../interfaces";

interface SearchProductByNameModalState {
    searchIsLoading:boolean;
    searchbarInputValue:string;
    products:Product[];
    errorOnSearch:boolean;
    errorMessage:string;
}

export enum SearchProductByNameModalActionKind {
    ADD_PRODUCTS = "ADD_PRODUCTS",
    CHANGE_SEARCH_INPUT_VALUE = "CHANGE_SEARCH_INPUT_VALUE",
    REINITIALIZE = "REINITIALIZE",
    SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
    SET_ERROR_ON_SEARCH = "SET_ERROR_ON_SEARCH",
    SET_PRODUCTS = "SET_PRODUCTS",
    SET_SEARCH_LOADING = "SET_SEARCH_LOADING",
}


type ActionType = 
    { type:SearchProductByNameModalActionKind.ADD_PRODUCTS, payload:Product[] }|
    { type:SearchProductByNameModalActionKind.CHANGE_SEARCH_INPUT_VALUE, payload:string }|
    { type:SearchProductByNameModalActionKind.REINITIALIZE }|
    { type:SearchProductByNameModalActionKind.SET_ERROR_MESSAGE, payload:string }|
    { type:SearchProductByNameModalActionKind.SET_ERROR_ON_SEARCH, payload:boolean }|
    { type:SearchProductByNameModalActionKind.SET_PRODUCTS, payload:Product[] }|
    { type:SearchProductByNameModalActionKind.SET_SEARCH_LOADING, payload:boolean }

export const initialStateSearchProductByNameProduct:SearchProductByNameModalState = {
    searchIsLoading:false,
    searchbarInputValue:'',
    products:[],
    errorMessage:'',
    errorOnSearch:false,
}

export const searchProductByNameModalReducer = (state:SearchProductByNameModalState, action:ActionType):SearchProductByNameModalState => {
    
    switch(action.type){

        case SearchProductByNameModalActionKind.ADD_PRODUCTS:
            return {
                ...state,
                products:[...state.products, ...action.payload]
            };

        case SearchProductByNameModalActionKind.CHANGE_SEARCH_INPUT_VALUE:
            return {
                ...state,
                searchbarInputValue:action.payload
            };

        case SearchProductByNameModalActionKind.REINITIALIZE:
            return {
                ...initialStateSearchProductByNameProduct
            };
        
        case SearchProductByNameModalActionKind.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage:action.payload
            }
        
        case SearchProductByNameModalActionKind.SET_ERROR_ON_SEARCH:
            return {
                ...state,
                errorOnSearch:action.payload
            }

        case SearchProductByNameModalActionKind.SET_PRODUCTS:
            return {
                ...state,
                products:action.payload
            };

        case SearchProductByNameModalActionKind.SET_SEARCH_LOADING:
            return {
                ...state,
                searchIsLoading:action.payload
            };



        default:
            return state;
        
    }
    
}


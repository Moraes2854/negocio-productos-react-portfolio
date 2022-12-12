import { CreateProductDto } from "../interfaces";

interface CreateProductModalState extends CreateProductDto {}

export enum CreateProductModalActionKind {
    CHANGE_FORM = "CHANGE_FORM",
    REINITIALIZE = "REINITIALIZE",
}


const stringProperties:string[] = ['barcode','name'];
const numberProperties:string[] = ['buy_price','sell_price'];

type ActionType = 
    { type:CreateProductModalActionKind.CHANGE_FORM, payload:{ name:string, value:string } }|
    { type:CreateProductModalActionKind.REINITIALIZE }

export const initialStateCreateProduct:CreateProductModalState = {
    barcode:'',
    name:'',
    buy_price:0,
    sell_price:0,
}

export const createProductModalReducer = (state:CreateProductModalState, action:ActionType) => {
    
    switch(action.type){
        case CreateProductModalActionKind.CHANGE_FORM:
            const { name, value} = action.payload;
            return {
                ...state,
                [name]:(numberProperties.includes(name)) ? Number(value.replace(/\D/g, '')) : value,
            };
        case CreateProductModalActionKind.REINITIALIZE:
            return {
                ...initialStateCreateProduct
            };
        default:
            return state;
        
    }
    
}


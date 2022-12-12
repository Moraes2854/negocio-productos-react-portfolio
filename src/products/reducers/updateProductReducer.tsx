import { UpdateProductDto } from "../interfaces";

interface UpdateProductModalState {
    updateProductDto:UpdateProductDto,
    inputBarcodeValue:string,
}

export enum UpdateProductModalActionKind {
    CHANGE_INPUT_BARCODE = "CHANGE_INPUT_BARCODE",
    CHANGE_UPDATE_PRODUCT_DTO = "CHANGE_UPDATE_PRODUCT_DTO",
    SET_UPDATE_PRODUCT_DTO = "SET_UPDATE_PRODUCT_DTO",
    REINITIALIZE = "REINITIALIZE",
}


const stringProperties:string[] = ['barcode','name'];
const numberProperties:string[] = ['buy_price','sell_price'];

type ActionType = 
    { type:UpdateProductModalActionKind.CHANGE_INPUT_BARCODE, payload:string }|
    { type:UpdateProductModalActionKind.CHANGE_UPDATE_PRODUCT_DTO, payload:{ name:string, value:string } }|
    { type:UpdateProductModalActionKind.SET_UPDATE_PRODUCT_DTO, payload:UpdateProductDto }|
    { type:UpdateProductModalActionKind.REINITIALIZE }

export const initialStateUpdateProduct:UpdateProductModalState = {
    inputBarcodeValue:'',
    updateProductDto:{
    },
}

export const updateProductReducer = ( state:UpdateProductModalState, action:ActionType ):UpdateProductModalState => {

    switch (action.type) {
        case UpdateProductModalActionKind.CHANGE_INPUT_BARCODE:
            return {
                ...state,
                inputBarcodeValue:action.payload
            }
        case UpdateProductModalActionKind.CHANGE_UPDATE_PRODUCT_DTO:
            const { name, value } = action.payload;
            return {
                ...state,
                updateProductDto:{
                    ...state.updateProductDto,
                    [name]:(numberProperties.includes(name)) ? Number(value.replace(/\D/g, '')) : value,
                }
            }
        case UpdateProductModalActionKind.SET_UPDATE_PRODUCT_DTO:
            return {
                ...state,
                updateProductDto:action.payload
            }
        case UpdateProductModalActionKind.REINITIALIZE:
            return {
                ...initialStateUpdateProduct
            }
        default:
            return state;
    }

}

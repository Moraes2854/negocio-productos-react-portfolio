export interface DeleteProductModalState {
    barcode:string,
    inputBarcodeValue:string,
}

export enum DeleteProductModalActionKind {
    UPDATE_BARCODE = "UPDATE_BARCODE",
    CHANGE_INPUT_BARCODE_VALUE = "CHANGE_INPUT_BARCODE_VALUE",
    REINITIALIZE = "REINITIALIZE",
}

type ActionType = 
    { type:DeleteProductModalActionKind.UPDATE_BARCODE, payload:string  } |
    { type:DeleteProductModalActionKind.CHANGE_INPUT_BARCODE_VALUE, payload:string } |
    { type:DeleteProductModalActionKind.REINITIALIZE }

export const initialStateDeleteProduct:DeleteProductModalState = {
    barcode:'',
    inputBarcodeValue:''
}

export const deleteProductModalReducer = (state:DeleteProductModalState, action:ActionType):DeleteProductModalState => {
    
    switch(action.type){
        case DeleteProductModalActionKind.UPDATE_BARCODE:
            return {
                ...state,
                barcode:action.payload
            };
        case DeleteProductModalActionKind.CHANGE_INPUT_BARCODE_VALUE:
            return {
                ...state,
                inputBarcodeValue:action.payload,
            };
        case DeleteProductModalActionKind.REINITIALIZE:
            return {
                ...initialStateDeleteProduct
            };
        default:
            return state;
    }

    
}


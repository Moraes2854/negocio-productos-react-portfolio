export interface Product {
    id:string;
    name:string;
    buy_price:number;
    sell_price:number;
    last_update:Date;
    barcode:string;
    enabled:boolean;
}

export interface CreateProductDto {
    name:string;
    buy_price:number;
    sell_price:number;
    barcode:string;
}

export interface UpdateProductDto {
    name?:string;
    buy_price?:number;
    sell_price?:number;
    barcode?:string;
    enabled?:boolean;
}
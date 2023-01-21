import { Product } from '../../products/interfaces/Product';

export interface ProductSale {
    product:Product;
    amount:number;
    total:number;
    id:string;
}

export interface Sale {
    productsSales:ProductSale[];
    total:number;
}
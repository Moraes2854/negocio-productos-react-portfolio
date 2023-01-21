import { fireErrorMessage } from '../../common/helpers';
import { Product } from '../interfaces';
import { useAppContext, useLoading } from '../../common/context';
import defaultApi from '../../api/defaultApi';

const getProduct = async( barcode:string ):Promise<Product|null> => {
    if (barcode !== ''){
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
    } = useAppContext();


    const { setLoading } = useLoading();

    const searchProductQuery = ( barcode:string ) => {
        
        if (barcode === '') return fireErrorMessage('Ingresar un código de barras válido');

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
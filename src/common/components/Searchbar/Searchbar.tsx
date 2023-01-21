import React, { FC } from 'react'

import { Product } from '../../../products/interfaces';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../../auth/context/AuthContext';

import './Searchbar.css';

interface SearchbarProps {
    onInputChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    onSearch:()=>void;
    productsDropdown:Product[];
    searchbarInputValue:string;
    searchIsLoading:boolean;
}


export const Searchbar:FC<SearchbarProps> = ({onInputChange, onSearch, productsDropdown, searchbarInputValue, searchIsLoading}) => {

    return (
        <div className="container mt-2">

            <div className="row w-100 d-flex justify-content-center align-items-center">

                <div className="col-md-10">

                    <div className="card">
                        <div className="search">
                            <i className="fa fa-search"></i>

                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={onInputChange}
                                value={ searchbarInputValue }
                                onKeyPress={(e)=>{
                                    if (e.key === 'Enter') {
                                        onSearch();
                                    }
                                }}
                            />
                            <button className="btn btn-primary" onClick={onSearch}>Buscar</button>

                        </div>
                        {
                            (productsDropdown.length > 0 && !searchIsLoading) && <ProductsDropdown products={productsDropdown}/>
                        }
                    </div>


                </div>
            
            </div>
        </div>
    )
    
}


interface DropdownProps {
    products:Product[],
}

const ProductsDropdown:FC<DropdownProps> = ({products}) => {

    const { user } = useAuth();

    const { 
        closeSearchProductByNameModal,
        openUpdateProductModal,
        setCurrentProduct,
    } = useAppContext();


    return (
        <>
            {
                products.map((product) => {
                    return (
                        <div key={`ProductsDropdownItem${product.id}`} className="list border-bottom justify-content-between">
                            <div>
                                <span> { product.name } <strong> ${ product.sell_price } </strong> </span> 
                            </div>
                            <div>
                                {
                                    (user && user.roles.includes('super-user')) && 
                                    <button 
                                        className='btn btn-primary' 
                                        style={{marginRight:'5px'}}
                                        onClick={()=>{
                                            setCurrentProduct(product);
                                            closeSearchProductByNameModal();
                                            openUpdateProductModal();
                                        }} 
                                    >
                                        Editar
                                    </button>
                                }
                            </div>                   
                        </div>
                    );
                })
            }
        </>
      )
}

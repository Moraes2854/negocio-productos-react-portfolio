
import React, { useState, useEffect, useRef, FC } from 'react'
import { DeleteOutline } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

import { AppLayout } from '../../common/Layout/AppLayout';
import { ProductSale } from '../interfaces/Sale';
import { useSalesPage } from '../hooks/useSalesPage';

import './SalesPageStyle.css';

export const SalesPage = () => {

  const { sale, deleteProductSale, updateAmountOfProductSale, reinitialize, onAddSale, updateSellPriceOfProductSale } = useSalesPage();

  const onF2Press = (e:KeyboardEvent)=>{
    if (e.key === 'F2') onAddSale();
  }

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(()=>{

    document.addEventListener('keydown', onF2Press , false);

    return ()=>{document.removeEventListener('keydown', onF2Press, false)}

  }, []);
  
  return (
    <AppLayout>
        <div className='d-flex justify-content-center text-light mt-4'>
            <div className="col-10 ">
                <div className="d-flex justify-content-between">
                    <h3>Total: ${sale.total} </h3>
                    <button type="button" className="btn btn-danger" onClick={reinitialize} >Reinciar</button>
                    <button type="button" className="btn btn-primary" onClick={handlePrint} >Imprimir</button>                
                    <button type="button" className="btn btn-success" onClick={onAddSale}>Agregar venta</button>
                </div>

                <table className="table table-borderless align-middle text-center mt-2 g-0">
                    <thead style={{backgroundColor:'#040404'}}>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Total</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sale.productsSales.map( ( productSale, i ) => (
                                <TableRow 
                                    key={`TableRow${productSale.id}`} 
                                    productSale={productSale} 
                                    i={i} 
                                    deleteProductSale={deleteProductSale} 
                                    updateAmountOfProductSale={updateAmountOfProductSale}
                                    updateSellPriceOfProductSale={updateSellPriceOfProductSale}
                                /> 
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div className="ticket" style={{display:'none'}} >
        {/* <div className="ticket" > */}
            <div ref={componentRef}>
                <p>
                    <br/> ROD-MAR  
                    <br/> Talcahuano 749  
                    <br/>                    
                        {
                            ("00" + new Date().getDate()).slice(-2) + "/" +
                            ("00" + (new Date().getMonth() + 1)).slice(-2) + "/" +
                            new Date().getFullYear() + " " +
                            ("00" + new Date().getHours()).slice(-2) + ":" +
                            ("00" + new Date().getMinutes()).slice(-2) + ":" +
                            ("00" + new Date().getSeconds()).slice(-2)
                        }
                </p>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center' style={{color:'black'}}>Cant</th>
                            <th className='text-center' style={{color:'black'}} >Producto</th>
                            <th className='text-center' style={{color:'black'}} >Precio</th>
                            <th className='text-center' style={{color:'black'}} >Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sale.productsSales.map(( productSale ) => (
                                <tr key={`TicketLine${productSale.id}`}>
                                    <td className='text-center' style={{color:'black'}} >{productSale.amount}</td>
                                    <td className='text-center' style={{color:'black'}} >{productSale.product.name}</td>
                                    <td className='text-center' style={{color:'black'}} >${productSale.product.sell_price}</td>
                                    <td className='text-center' style={{color:'black'}} >${productSale.product.sell_price * productSale.amount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <p className='text-center' style={{color:'black', marginTop:'10px'}}><b>Total: ${sale.total} </b></p>
                <p className='text-center'>Gracias por su compra!</p>
            </div>
        </div>
    </AppLayout>
  )
}

interface TableRowProps {
    productSale:ProductSale;
    i:number;
    deleteProductSale:(id:string)=>void;
    updateAmountOfProductSale:( id:string, newAmount:number )=>void;
    updateSellPriceOfProductSale:( id:string, newSellPrice:number )=>void;
}


const TableRow: FC<TableRowProps> = ({ productSale , i, deleteProductSale, updateAmountOfProductSale, updateSellPriceOfProductSale}) => {

  const { amount, id, product, total } = productSale;
  
  
  const inputAmountRef = React.useRef<HTMLInputElement>(null);
  const [showInputAmount, setShowInputAmount] = useState(false);
  const [newAmount, setNewAmount] = useState(amount);
  useEffect(()=>{
    if (inputAmountRef.current) if (showInputAmount) inputAmountRef.current.focus();
  }, [showInputAmount]);


  const inputSellPriceRef = React.useRef<HTMLInputElement>(null);
  const [showInputSellPrice, setShowInputSellPrice] = useState(false);
  const [newSellPrice, setNewSellPrice] = useState(product.sell_price);
  useEffect(()=>{
    if (inputSellPriceRef.current) if (showInputSellPrice) inputSellPriceRef.current.focus();
  }, [showInputSellPrice]);


  return (
    <tr style={ { backgroundColor:(i%2 === 0) ? '#e02c30' : '#040404'  } }>
        <Tooltip title={product.name} placement="top-start">
            <td style={{maxWidth:'125px'}}>{product.name}</td>
        </Tooltip>
        <td 
            onDoubleClick={()=>{setShowInputAmount(true)}}
        >
            {
                (showInputAmount) ?
                <input 
                    ref={inputAmountRef}
                    type="text" 
                    name="newAmount"
                    autoComplete="off"
                    key={`newAmountInput${product.id}`}
                    value={newAmount}
                    onChange={({target})=>{
                        setNewAmount(Number(target.value.replace(/\D/g, "")));
                    }}
                    onKeyDownCapture={(e)=>{
                        if (e.key === 'Enter'){
                            setShowInputAmount(false);
                            updateAmountOfProductSale(id, newAmount);
                        }                                
                    }}
                />
                :
                <>{amount}</>
            }
        </td>
        <td 
            onDoubleClick={()=>{setShowInputSellPrice(true)}}
        >
            {
                (showInputSellPrice) ?
                <input 
                    ref={inputSellPriceRef}
                    type="text" 
                    name="newSellPrice"
                    autoComplete="off"
                    key={`newSellPriceInput${product.id}`}
                    value={newSellPrice}
                    onChange={({target})=>{
                        setNewSellPrice(Number(target.value.replace(/\D/g, "")));
                    }}
                    onKeyDownCapture={(e)=>{
                        if (e.key === 'Enter'){
                            setShowInputSellPrice(false);
                            updateSellPriceOfProductSale(id, newSellPrice);
                        }                                
                    }}
                />
                :
                <>{`$${product.sell_price}`}</>
            }
        </td>
        <td>{`$${total}`}</td>
        <td>
            <IconButton
                color={(i%2 === 0) ? 'inherit' : 'error'}
                onClick={()=>{deleteProductSale(id)}}
            >
                <DeleteOutline/>
            </IconButton>
        </td>
    </tr>
  )
}

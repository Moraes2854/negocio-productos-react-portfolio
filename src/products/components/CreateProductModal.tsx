import { FC, useRef } from 'react';
import { Html5QrcodeScanType } from 'html5-qrcode';
import Modal from 'react-bootstrap/Modal';

import { Scanner } from '../../common/components/Scanner';
import { useCreateProductModal } from '../hooks';
import { useLoading } from '../../common/context/LoadingContext';



interface Props{
    isModalOpen:boolean;
    closeModal:()=>void;
}


export const CreateProductModal:FC<Props> = ({isModalOpen, closeModal}) => {
    const { loading } = useLoading();
    const inputBarcodeRef = useRef<HTMLInputElement>(null);
    const { createProductDto, handleFormChange, setBarcode, onSubmit, reinitialize } = useCreateProductModal();
    const { barcode, name, sell_price } = createProductDto;

    return (
        <Modal
            show={ (isModalOpen) ? !loading : false } 
            onHide={ ()=>{
                closeModal();
                reinitialize();
            }} 
            onShow={()=>{
                if (inputBarcodeRef.current) inputBarcodeRef.current.focus();
            }}
            style={{
                display:(loading) ? 'none' : 'flex',
            }}
            onBackdropClick={()=>{
                closeModal();
                reinitialize();
            }} 
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear Producto</Modal.Title>
            </Modal.Header>
            
            <div className="row d-flex justify-content-center mb-5">
                <div className="col d-flex flex-column align-items-center w-100">

                    <Scanner
                        fps={2}
                        qrCodeSuccessCallback={(decodedText)=>setBarcode(decodedText)}
                        verbose
                        supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_CAMERA]}
                    /> 


                    <div className='mt-3'>

                        <div className='text-center'><label> Código de barras: </label></div> 
                        
                        <input
                            ref={inputBarcodeRef}
                            className="custom-input mt-1 text-center"
                            name='barcode'
                            value={barcode}
                            onChange={handleFormChange}
                            autoComplete='off'
                        />

                        <div className='text-center'><label> Nombre: </label></div> 
                        
                        <input
                            className="custom-input mt-1 text-center"
                            name='name'
                            value={name}
                            onChange={handleFormChange}
                            autoComplete='off'
                        />

                        <div className='text-center'><label> Precio: </label></div> 
                        
                        <input
                            className="custom-input mt-1 text-center"
                            name='sell_price'
                            value={(sell_price) ? sell_price : ''}
                            onChange={handleFormChange}
                            autoComplete='off'
                        />

                        <div className="mt-3">
                            <button className='custom-button' onClick={onSubmit}>
                                Guardar producto
                            </button>
                        </div>
                    </div>

                
                </div>
            </div>


        </Modal>
    )
}

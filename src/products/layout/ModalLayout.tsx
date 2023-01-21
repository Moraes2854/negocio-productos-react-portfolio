import { FC, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Html5QrcodeScanType } from 'html5-qrcode';

import { Scanner } from '../../common/components/Scanner';
import { useLoading } from '../../common/context/LoadingContext';




interface Props{
    isOpen:boolean;
    closeModal:()=>void;
    modalTitle:string;
    inputBarcodeValue:string;
    onInputBarcodeValueChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    showSearchProductButton:boolean;
    searchProduct:(value:string)=>void;
    children:any;
    onShowModal?:()=>void;
}


export const ModalLayout: FC<Props> = ({isOpen, closeModal, modalTitle, searchProduct, showSearchProductButton, inputBarcodeValue, onInputBarcodeValueChange, children, onShowModal}) => {
    
    const { loading } = useLoading();
    
    const inputBarcodeRef = useRef<HTMLInputElement>(null);

    return (
        <Modal
            show={ (isOpen) ? !loading : false } 
            onShow={()=>{
                if (inputBarcodeRef.current) inputBarcodeRef.current.focus();
                if (onShowModal) onShowModal();
            }}
            
            onHide={ closeModal } 
            onBackdropClick={ closeModal }
            onExit={ closeModal }

            style={{
                display:(loading) ? 'none' : 'flex',
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            
             <div className="row d-flex justify-content-center mb-5">
                 <div className="col d-flex flex-column align-items-center w-100">
                    
                    <Scanner
                        fps={2}
                        qrCodeSuccessCallback={(decodedText)=>searchProduct(decodedText)}
                        verbose
                        supportedScanTypes={[Html5QrcodeScanType.SCAN_TYPE_CAMERA]}
                    />

                    {
                        (showSearchProductButton) && (
                            <div className="mt-3">
                                <button className="btn btn-primary btn-lg" onClick={()=>{searchProduct(inputBarcodeValue)}}>
                                    Buscar
                                </button>
                            </div>
                        )
                    }

                    <div className='mt-3'>

                        <div className='text-center'><label> Código de barras: </label></div>                       
                        <input
                            ref={inputBarcodeRef}
                            className="custom-input mt-1 text-center"
                            value={inputBarcodeValue}
                            onChange={onInputBarcodeValueChange}
                            autoComplete='off'
                            onKeyPress={(e)=>{
                                if (e.key === 'Enter') {
                                    searchProduct(inputBarcodeValue);
                                }
                            }}
                        />

                    </div>

                     { children }

                     <Modal.Footer style={{justifyContent:'center'}}>
                        <Button variant="primary" onClick={closeModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>

                 </div>
             </div>
       

        </Modal>
    )
} 
import React, { FC, useEffect, useState } from 'react';
import { Html5QrcodeSupportedFormats, Html5Qrcode } from "html5-qrcode";
import { Html5QrcodeResult } from "html5-qrcode/cjs/core";
import { CameraDevice } from 'html5-qrcode/esm/camera/core';

import { ScannerConfig } from './ScannerConfig';

import './Scanner.css';


interface Props extends ScannerConfig{
    verbose:boolean;
    qrCodeSuccessCallback:(decodedText:string, decodedResult: Html5QrcodeResult)=>void;
}

const formatsToSupport:Html5QrcodeSupportedFormats[] = [
    Html5QrcodeSupportedFormats.CODABAR,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.EAN_13
];


export const Scanner:FC<Props> = ({qrCodeSuccessCallback, verbose, ...props} ) => {
    const [cameras, setCameras] = useState<CameraDevice[]>([]);
    const [showSelectCamera, setShowSelectCamera] = useState<boolean>(false);

    const [displayCamera, setDisplayCamera] = useState<boolean>(false);
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode|null>(null);
    
    const [cameraId, setCameraId] = useState<string>('');

    const onSelectCamera = (id:string) => {
        setCameraId(id);
        setDisplayCamera(true);
    }

    const useCamera = () => {
        Html5Qrcode.getCameras()
        .then((devices) => {
            if (devices && devices.length>0){
                setDisplayCamera(false);
                setCameras(devices);      
                setShowSelectCamera(true);
            }      
            else throw new Error('There is no cameras to select');
        }).catch(err => {
            console.log(err)   
        });
    }

    const closeCamera = () => {
        setDisplayCamera(false);
        setShowSelectCamera(false);
        if (html5QrCode) html5QrCode.stop();
    };



    useEffect(()=>{
        if (cameraId !== '' && html5QrCode && displayCamera){
            html5QrCode.start(
                cameraId,
                {
                    fps: 2,
                    qrbox: {width:150, height:150} 
                },
                (decodedText, decodedResult) => {  
                    qrCodeSuccessCallback(decodedText, decodedResult);
                    closeCamera();
                },
                errorMessage => {})
            .catch(err => { 
                console.log(`Unable to start scanning, error: ${err}`);
            });
        }
    }, [cameraId, displayCamera]);


    useEffect(() => {
        setHtml5QrCode(new Html5Qrcode("reader", {
            verbose:true,
            formatsToSupport,
            useBarCodeDetectorIfSupported:true,
        }));
    }, [])
    
    return (
        <div className='row'>
            <div className="col">
                <div id="reader" style={{
                    display:(displayCamera) ? 'flex' : 'none',
                    width:300, 
                    height:250
                }}></div>

                <div className="row mt-2">

                    <div className="col w-100 d-flex justify-content-center flex-column align-items-center">
                        <button 
                            className="btn btn-primary"
                            onClick={(displayCamera) ? closeCamera : useCamera}
                        >
                            {(displayCamera) ? 'Parar cámara' : 'Usar cámara'}
                        </button>

                        <div className="mt-2">                            
                            {
                                (showSelectCamera && !displayCamera) && (

                                    <DropdownSelectCamera devices={cameras} onCameraSelect={onSelectCamera} />
                                    
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div> 
    )
}

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

interface DropdownSelectCameraProps {
    devices: CameraDevice[];
    onCameraSelect:(id:string)=>void;
}

const DropdownSelectCamera:FC<DropdownSelectCameraProps> = ({devices, onCameraSelect}) => {

    const [selectedDevice, setSelectedDevice] = useState<CameraDevice|null>(null);

    useEffect(() => {
        if (selectedDevice) onCameraSelect(selectedDevice.id);
    }, [selectedDevice])
    

    return (
        <DropdownButton id="dropdown-basic-button" title={(selectedDevice) ? selectedDevice.label : 'Seleccionar cámara'}>
            {
                devices.map((device)=>(
                    <Dropdown.Item onClick={()=>{setSelectedDevice(device)}} > {device.label} </Dropdown.Item>
                ))
            }
        </DropdownButton>
    )
}

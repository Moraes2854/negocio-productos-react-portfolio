import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const fireSuccessMessage = (msg:string, timer:number = 7000, width:string = '17vw') => {

    toast.success(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose:timer
    });

}

export const fireErrorMessage = (msg:string, timer:number = 7000, width:string = '17vw') => {

    toast.error( msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose:timer
    })

}
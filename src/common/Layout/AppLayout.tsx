import { ToastContainer } from 'react-toastify';

import { CustomNavbar, LoadingSpinner } from '../components';
import { LoginModal } from '../../auth/components/LoginModal';
import { useLoading } from '../context/LoadingContext';


import './globalStyles.css';
import 'react-toastify/dist/ReactToastify.css';


export const AppLayout = ({children}:any) => {
    
    const { loading } = useLoading();
    
    return (
        <>
            <CustomNavbar />
            <div className='main d-flex'>
                <>
                    {
                        (loading) 
                        ?
                            <>
                                <LoadingSpinner/>
                            </>
                        :
                        <div className="row w-100 g-0">
                            {children}
                        </div>
                    }
                </>
            </div>

            <LoginModal />
            <ToastContainer />
        </>
    );

}
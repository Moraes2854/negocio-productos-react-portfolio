
import defaultApi from '../../api/defaultApi';
import { useLoading } from '../../common/context/LoadingContext';
import { fireErrorMessage, fireSuccessMessage } from '../../common/helpers';

const downloadSQLBackupDB = async () :Promise<string> => {

    return new Promise((resolve, reject)=>{
        const fileName = `backup.sql`;
    
        defaultApi.post('/backup', {
            responseType: 'blob',
            headers:{ 
                'Content-Type': 'application/sql',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => {
            const temp = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = temp;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve(fileName);
        })
        .catch((err) => {
            reject(err)
        })

    })
}

export const usePanel = () => {
    const { setLoading } = useLoading();


    const onDownloadBackupButtonClick = async () => {
        try {
            setLoading(true);
    
            const fileName = await downloadSQLBackupDB();
            setLoading(false);
    
            if (fileName) fireSuccessMessage(`Se ha descargado el archivo ${fileName}`);
            
        } catch (error:any) {
            setLoading(false);
            fireErrorMessage(error.response.data.message);
        }

    }


    return {
        onDownloadBackupButtonClick,
    }
}

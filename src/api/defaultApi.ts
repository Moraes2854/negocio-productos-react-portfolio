import axios from 'axios';
import { getEnvVariables } from '../common/helpers/getEnvVariables';


const baseURL = `${getEnvVariables().VITE_APP_API_URL}`;

const defaultApi = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

defaultApi.interceptors.request.use( (config) => {
    config.headers = {
        ...config.headers,
    }
    return config;
});

export default defaultApi;

export const getEnvVariables = () => {
    return {
        //@ts-ignore
        VITE_APP_API_URL:import.meta.env.VITE_APP_API_URL
    };
}
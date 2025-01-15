import axios from 'axios';
import env from "react-dotenv";


export const getDashboardContratoHTTP = async (apm_obra: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDashboardContrato"}?apm_obra=${apm_obra}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

import axios from 'axios';
import env from "react-dotenv";

export const getVerCuentasContablesHttp = async (id_obra: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getVerCuentasContables"}?id_obra=${id_obra}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getContratosCuentasContablesHttp = async (id_obra: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getContratosCuentasContables"}?id_obra=${id_obra}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};




import axios from 'axios';
import env from "react-dotenv";


export const setCliente = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setCliente"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getClientes = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllClientes"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editEstatusCliente = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/updateEstatusCliente"}?id=${data?.id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editCliente = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/updateCliente"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
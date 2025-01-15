import axios from 'axios';
import env from "react-dotenv";
import { GeneralHttpResponseCatalogo } from '../types/geericTypes';


export const setDocumento = async (data: any): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.post(
            `${env.API_URL}${"/setDocumento"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const unSetDocumento = async (data: any): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.delete(
            `${env.API_URL}${"/unSetDocumento?id="}${data?.id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getDocumentosRepositorio = async (): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.get(
            `${env.API_URL}${"/getAllDocumentosRepositorio"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
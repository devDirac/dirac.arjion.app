import axios from 'axios';
import env from "react-dotenv";

export const getParametrosHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getParametros"}?user=${data?.user}`, 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const analizaImagenHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/analizaImagen"}`,data 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const reportSpeachHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/reportSpeach"}`,data , { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDataQueryVozhHttp = async (url: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDataQueryVoz"}?${url}`, 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const eliminaGrabacionHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/eliminaGrabacion"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const generaReportePeriodosVariosHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/generaReportePeriodosVarios"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getDataQueryReportesCreadoshHttp = async (url: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDataQueryReportesCreados"}?${url}`, 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const creaParametroHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/creaParametro"}`,data 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const eliminaParametroHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/eliminaParametro"}`,data 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editaParametroHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/editaParametro"}`,data 
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
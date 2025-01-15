import axios from 'axios';
import env from "react-dotenv";


export const getDocumentosCalidadHttp = async (id_contrato: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDocumentosCalidad"}?id_contrato=${id_contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setDocumentoCalidadHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDocumentoCalidad"}`,data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setComentarioCalidadHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setComentarioCalidad"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const aprobarDocumentoComentarioHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/aprobarDocumentoComentario"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}; 

export const rechazarDocumentoComentarioHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/rechazarDocumentoComentario"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const eliminarDocumentoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/eliminarDocumento"}?espacio=${data?.espacio}&contrato=${data?.contrato}&id=${data?.id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const enviarDocumentacionHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/enviarDocumentacion"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const cerrarPaqueteDocumentalHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/cerrarPaqueteDocumental"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const enviaPaqueteHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/enviaPaquete"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const eliminaPaqueteHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/eliminaPaquete"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};




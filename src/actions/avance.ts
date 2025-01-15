import axios from 'axios';
import env from "react-dotenv";


export const guardaAvanceHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/guardaAvance"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getAvancesPorConfirmarHttp = async (id_contrato:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvancesPorConfirmar"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const confirmarAvanceHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/confirmarAvance"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const getAvancesConfirmadosHttp = async (id_contrato:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvancesConfirmados"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getAvancesPendientesPorEstimarHttp = async (id_contrato:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvancesPendientesPorEstimar"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const enviarCorreoHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/enviarCorreo"}`,{}
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const getAvancesPorEstimarHttp = async (id_contrato:string, fechaInicio:string,fechaFin:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvancesPorEstimar"}?id_contrato=${id_contrato}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAvancesEstimadosEdicionHttp = async (id_contrato:string, id_estimacion:string, fechaInicio:string,fechaFin:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvancesEstimadosEdicion"}?id_contrato=${id_contrato}&id_estimacion=${id_estimacion}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const getNotasAvancesHttp = async (id_concepto:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getNotasAvances"}?id_concepto=${id_concepto}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const setNotasAvancesHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setNotasAvances"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getMatrizAvanceHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getMatrizAvance"}?id_contrato=${data?.id_contrato}&fechaInicio=${data?.fechaInicio}&fechaFin=${data?.fechaFin}&id_concepto=${data?.concepto}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getMatrizAvanceGroupByConceptoHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getMatrizAvanceGroupByConcepto"}?id_contrato=${data?.id_contrato}&fechaInicio=${data?.fechaInicio}&fechaFin=${data?.fechaFin}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getMatrizAvanceGroupByConceptoFechaCapturaHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getMatrizAvanceGroupByConceptoFechaCaptura"}?id_contrato=${data?.id_contrato}&fechaInicio=${data?.fechaInicio}&fechaFin=${data?.fechaFin}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const editaAvanceHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editaAvance"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteAvanceHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteAvance"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


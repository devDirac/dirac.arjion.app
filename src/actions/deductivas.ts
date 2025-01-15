import axios from 'axios';
import env from "react-dotenv";

export const setDeductivasPorContratoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDeductivasPorContrato"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDeductivasDisponiblesPorContratoHttp = async (id_contrato: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDeductivasDisponiblesPorContrato"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getUltimaDeductivasDisponiblesPorContratoHttp = async (id_contrato: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getUltimaDeductivasDisponiblesPorContrato"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDeductivasPorContratoHttp = async (id_contrato: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDeductivasPorContrato"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const updateDeductivasPorContratoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/updateDeductivasPorContrato"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteDeductivasPorIdHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteDeductivasPorId"}?id=${id}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

import axios from 'axios';
import env from "react-dotenv";



export const addPisoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/addPiso"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setInfoBannerHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setInfoBanner"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getInfoBannerHttp = async (piso: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getInfoBanner"}?piso=${piso}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPlayListHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getPlayList"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const updateInfoBannerHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/updateInfoBanner"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteInfoBannerHttp = async (id: any, idPlayList: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteInfoBanner"}?id=${id}&idPlayList=${idPlayList}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editPisoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/editPiso"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deletePisoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deletePiso"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getContenidoParaAsignarHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getContenidoParaAsignar"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getContenidoInformacionHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getContenidoInformacion"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const asignarContenidoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/asignarContenido"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

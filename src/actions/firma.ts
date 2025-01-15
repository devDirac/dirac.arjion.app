import axios from 'axios';
import env from "react-dotenv";

export const SET_FIRMA_ALLOW = "@SET_FIRMA_ALLOW";

export const setFirmaAllow = (allow: boolean) => {
  return {
    type: SET_FIRMA_ALLOW,
    value: allow,
  };
};


export const setFirmaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setFirma"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getFirmaHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getFirma"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const updateFirmaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/updateFirma"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getClaveByUserPasswordHttp = async (contrasena: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getClaveByUserPassword"}?contrasena=${contrasena}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const getFirmaByclaveHttp = async (clave: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getFirmaByclave"}?clave=${clave}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

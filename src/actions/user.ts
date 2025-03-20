
import axios from 'axios';
import env from "react-dotenv";

export const gacGetUserDataHttp = async (id: string, esAdmin:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/gacGetUserData"}?id=${id}&esAdmin=${esAdmin}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getUserIdHashHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getUserIdHash"}?id=${id}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const getGetUsuariosAdministradoresHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGetUsuariosAdministradores"}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGetUsuariosNominaHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGetUsuariosNomina"}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};




export const getGetUsuariosPerfilesSolicitudHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGetUsuariosPerfilesSolicitud"}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setPerfilSolicitudHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setPerfilSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setPerfilSolicitudNominaHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setPerfilSolicitudNomina"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};




export const gacGetSolicitudesJefesAreaHttp = async (id_usuario:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/gacGetSolicitudesJefesArea"}?id_usuario=${id_usuario}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const gacGetSolicitudesAdminsHttp = async (id_usuario:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/gacGetSolicitudesAdmins"}?id_usuario=${id_usuario}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const addBancoHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/addBanco"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


import axios from 'axios';
import env from "react-dotenv";

export const gacGetUserDataHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/gacGetUserData"}?id=${id}`,
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


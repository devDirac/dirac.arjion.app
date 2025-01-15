import { GeneralHttpResponse } from "../types/geericTypes";
import axios from 'axios';
import env from "react-dotenv";

export const getUserPermisos = async () => {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getUsuariosPermisos"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setUserPermisos = async (data: any) => {
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/setUsuariosPermisos"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const removeUserPermisos = async (id_usuario: number, id_permiso: any) => {
    try {
        const response: GeneralHttpResponse = await axios.delete(
            `${env.API_URL}${"/removeUsuariosPermisos"}?id_permiso=${id_permiso}&id_usuario=${id_usuario}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const saveUser = async (data: any) => {
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/register"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editUser = async (data: any) => {
    try {
        const response: GeneralHttpResponse = await axios.put(
            `${env.API_URL}${"/editUser"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setActiveUser = async (data: any) => {
    try {
        const response: GeneralHttpResponse = await axios.delete(
            `${env.API_URL}${"/setActiveUser"}?id=${data?.id}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getUsuariosObraHTTP = async (espacio:any) => {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getUsuariosObra"}?espacio=${espacio}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


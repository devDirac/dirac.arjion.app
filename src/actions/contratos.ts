import axios from 'axios';
import env from "react-dotenv";
import { GeneralHttpResponse, GeneralHttpResponseCatalogo } from '../types/geericTypes';

export const SET_CONTRATO_ESPACIO = "@SET_CONTRATO_ESPACIO";

export const setContratoEspacio = (value: any) => {
    return {
      type: SET_CONTRATO_ESPACIO,
      value,
    };
};
  
export const setContratoHttp = async (data: any): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.post(
            `${env.API_URL}${"/setContrato"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const updateContratoHttp = async (data: any): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.put(
            `${env.API_URL}${"/updateContrato"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteContratoHttp = async (data: any): Promise<any> => {
    try {
        const response: GeneralHttpResponseCatalogo = await axios.put(
            `${env.API_URL}${"/deleteContrato"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const saveUserContrato = async (data:any) => {
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/signupContratos"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setUserToContractHTTP = async (data:any) => {
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/setUserToContract"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const unSetUserToContractHTTP = async (data:any) => {
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/unSetUserToContract"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getContratoDetalleByIdContratoHttp = async (id:string,esSupervisor:boolean)=> {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getContratoDetalleByIdContrato"}?id_obra=${id}&esSupervisor=${esSupervisor}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const getContratoDetalleByIdContratoSupervisorHttp = async (id:string,esSupervisor:boolean)=> {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getContratoDetalleByIdContratoSupervisor"}?id_obra=${id}&esSupervisor=${esSupervisor}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const getContratoDetalleHttp = async (esSupervisor:boolean)=> {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getContratoDetalle"}?esSupervisor=${esSupervisor}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const setParametroToContratoHttp = async (data:any)=>{
    try {
        const response: GeneralHttpResponse = await axios.post(
            `${env.API_URL}${"/setParametroToContrato"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const getCotratosPorObraHttp = async (id_obra:any)=> {
    try {
        const response: GeneralHttpResponse = await axios.get(
            `${env.API_URL}${"/getCotratosPorObra"}?id_obra=${id_obra}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}
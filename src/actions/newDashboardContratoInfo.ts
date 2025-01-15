import axios from 'axios';
import env from "react-dotenv";

export const getAlertasEnConceptosHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAlertasEnConceptos"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getConceptosFueraCatalogoHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getConceptosFueraCatalogo"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getClasificacionesDeObraHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getClasificacionesDeObra"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getMatrizAvancePorFrenteAlCorteHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getMatrizAvancePorFrenteAlCorte"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getProgramaFinancieroHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getProgramaFinancieroDashboard"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getHitosHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getHitos"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getEstimacionesDashboardHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getEstimacionesDashboard"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getErogacionesProgramadasObraFrenteHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getErogacionesProgramadasObraFrente"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAvanceFinancieroReaclVsProgramadoHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvanceFinancieroReaclVsProgramado"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getAvanceFinancieroReaclVsProgramadoContratoHTTP = async (id_obra_principal: any,contratos=''): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAvanceFinancieroReaclVsProgramadoContrato"}?id_obra_principal=${id_obra_principal}&contratosIds=${contratos}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

import axios from 'axios';
import env from "react-dotenv";




export const getDetalleSolicitudHttp = async (id: any, id_autorizador:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDetalleSolicitud"}?id_solicitud=${id}&id_autorizador=${id_autorizador}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setDocumentoSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDocumentoSolicitud"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const apruebaSolicitudJefeDirectoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/apruebaSolicitudJefeDirecto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const solicitaAprobacionDireccionGeneralHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/solicitaAprobacionDireccionGeneral"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const cambioEnSolicitudAutorizadorHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/cambioEnSolicitudAutorizador"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const notificaRevisoresFiscalesHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/notificaRevisoresFiscales"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const notificaRevisoresFiscalesAutorizadorHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/notificaRevisoresFiscalesAutorizador"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const handleDocumentosRevisorRevisaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/handleDocumentosRevisorRevisa"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const cambioEnSolicitudRevisorHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/cambioEnSolicitudRevisor"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const cambioEnSolicitudPagadorHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/cambioEnSolicitudPagador"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const generarZipSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/generarZipSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const firmarDocumentoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/firmarDocumento"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const atualizaTipoSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/atualizaTipoSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const actualizaIdConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/actualizaIdConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const solicitaCargaDocumentalHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/solicitaCargaDocumental"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const notificaNominaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/notificaNomina"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


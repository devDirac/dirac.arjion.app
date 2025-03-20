import axios from 'axios';
import env from "react-dotenv";

/* CONCEPTOS */
export const getAllConceptosHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllConceptos"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/deleteConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

/* TIPO SOLICITUD */
export const getAllTiposSolicitudesHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllTiposSolicitudes"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setTiposSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setTiposSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editTiposSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editTiposSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteTiposSolicitudHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/deleteTiposSolicitud"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

/* FORMA DE PAGO */
export const getAllFormasPagoHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllFormasPago"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setFormaPagoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setFormaPago"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editFormaPagoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editFormaPago"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteoFrmaPagoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/deleteoFrmaPago"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

/* Catalohos genericos */
export const getGacEquivalenciaMonedaExtDolHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacEquivalenciaMonedaExtDol"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const getGacCatFormaPagoHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacCatFormaPago"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const getGacCatConceptosHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacCatConceptos"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const getGacProyectosSgiHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacProyectosSgi"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGactodosLosUsuariosHTTP = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGactodosLosUsuarios"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGacBeneficiariosHttp = async (id_director_area:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacBeneficiarios"}?id_director_area=${id_director_area}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const getGacEmpresasHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacEmpresas"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGacTipoCambioDolarHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacTipoCambioDolar"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setGacEquivalenciaMonedaExtDolHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setGacEquivalenciaMonedaExtDol"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setGacTipoCambioDolarHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setGacTipoCambioDolar"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGacCatPerfilesHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacCatPerfiles"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getGacProveedoresHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getGacProveedores"}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};




export const setProveedorHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setProveedor"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

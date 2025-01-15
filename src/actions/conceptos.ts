import axios from 'axios';
import env from "react-dotenv";


export const guardaConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/guardaConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAllConceptosHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllConceptos"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAllConceptosPorObraHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllConceptosPorObra"}?id_obra=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const actualizaEstatusConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/actualizaEstatusConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const actualizaConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/actualizaConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const agregaProveedorConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/agregaProveedorConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const verProveedorPorConceptoHttp = async (id_concepto: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/verProveedorPorConcepto"}?id_concepto=${id_concepto}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const eliminaProveedorPorConceptoHttp = async (id: string): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/eliminaProveedorPorConcepto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}


export const actualizaProveedorPorConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/actualizaProveedorPorConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
}

export const getConceptosPorContratoHttp = async (id_contrato: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getConceptosPorContrato"}?id_contrato=${id_contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getResponsablesHttp = async (id_contrato: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getResponsables"}?id_contrato=${id_contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const addHitosConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/addHitosConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getHitosContratoHttp = async (id_contrato: string, id_concepto: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getHitosContrato"}?id_contrato=${id_contrato}&id_concepto=${id_concepto}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editHitosConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editHitosConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteHitosConceptoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/removeHitosConcepto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const cerrarHitoConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/cerrarHitoConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const solicitaAutorizacionHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/solicitaAutorizacion"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const autorizaHitosHttp = async (token: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/autorizaHitos"}?token=${token}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const addMediaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/addMedia"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const editMediaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editMedia"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const removeMediaHttp = async (id: any, espacio: any, contrato: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/removeMedia"}?id=${id}&espacio=${espacio}&contrato=${contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const setResponsablesConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setResponsablesConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getResponsablesConeptoHttp = async (id_concepto: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getResponsablesConepto"}?id_concepto=${id_concepto}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const editResponsablesConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editResponsablesConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteResponsablesConceptoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteResponsablesConcepto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getCatalogoConceptosHttp = async (id_contrato: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getCatalogoConceptos"}?id_contrato=${id_contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



export const setNotasConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setNotasConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const editNotasConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.put(
            `${env.API_URL}${"/editNotasConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteNotasConceptoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteNotasConcepto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteConceptoAndRelationsHttp = async (id: any, contrato: any, espacio: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteConceptoAndRelations"}?id=${id}&contrato=${contrato}&espacio=${espacio}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const autorizaPreExtraordinarioPasoUnoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/autorizaPreExtraordinarioPasoUno"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const autorizaPreExtraordinarioPasoDosHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/autorizaPreExtraordinarioPasoDos"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const autorizaPreExtraordinarioPasoTresHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/autorizaPreExtraordinarioPasoTres"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDocumentosCalidadConceptosHttp = async (id_contrato: any, fecha_inicio: string, fecha_fin: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDocumentosCalidadConceptos"}?id_contrato=${id_contrato}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setDocumentoCalidadConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDocumentoCalidadConcepto"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const deleteDocumentoCalidadCoceptoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteDocumentoCalidadCocepto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDocumentosCalidadHttp = async (id_contrato: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDocumentosCalidadConceptoReutilizar"}?id_contrato=${id_contrato}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const reutilizaDocumentoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/reutilizaDocumento"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const aprobarDocumentoCalidadConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/aprobarDocumentoCalidadConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const rechazarDocumentoCalidadConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/rechazarDocumentoCalidadConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const noAplicaDocumentoCalidadConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/noAplicaDocumentoCalidadConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const pendienteDocumentoCalidadConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/pendienteDocumentoCalidadConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setDocumentoCalidadSinArchivoConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDocumentoCalidadSinArchivoConcepto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setDocumentoCalidadPendienteConceptoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setDocumentoCalidadPendienteConcepto"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const avisarCoordinadorHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/avisarCoordinador"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

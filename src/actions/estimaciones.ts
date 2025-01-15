import axios from 'axios';
import env from "react-dotenv";

export const SET_ELEMENTOS_ESTIMAR = "@SET_ELEMENTOS_ESTIMAR";

export const setElementosEstimar = (value: any[]) => {
  return {
    type: SET_ELEMENTOS_ESTIMAR,
    value,
  };
};



export const getEstimacionesDefinitivasPorContratoHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEstimacionesDefinitivasPorContrato"}?id_contrato=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getListaEstimacionesDefinitivasHttp = async (id: number,id_contrato:number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getListaEstimacionesDefinitivas"}?id_proyecto=${id}&id_contrato=${id_contrato}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}



export const setEstimacionDefinitivaHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setEstimacionDefinitiva"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const getListaEstimacionDetalleDefinitivasHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getListaEstimacionDetalleDefinitivas"}?id_estimacion=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}



export const setDocumentoEstimacionHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setDocumentoEstimacion"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};




export const getDocumentosEstimacionHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getDocumentosEstimacion"}?id_estimacion=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getDeductivasAdicionalesEstimacionHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getDeductivasAdicionalesEstimacion"}?id_estimacion=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getEstimacionesDefinitivasPorContratoDeductivasHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEstimacionesDefinitivasPorContratoDeductivas"}?id_contrato=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getDeduccionesConceptosHttp = async (id: number): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getDeduccionesConceptos"}?id_estimacion=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const envioRevisionHttp = async (data: { id: number }): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/envioRevision"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const revisarEstimacionHttp = async (data: { id: number }): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/revisarEstimacion"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const autorizarEstimacionHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/autorizarEstimacion"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const rechazarEstimacionHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/rechazarEstimacion"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const generaPaqueteHttp = async (idEspacio: string, idContrato: string, idEstimacion: string, fecha_inicio = '', fecha_fin = ''): Promise<any> => {
  try {
    let url = ''
    if(fecha_inicio !== '' && fecha_fin !== '' ){
      url  = `&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    }
    const response: any = await axios.get(
      `${env.API_URL}${"/generaPaquete"}?idEspacio=${idEspacio}&idContrato=${idContrato}&idEstimacion=${idEstimacion}${url}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const eliminaPaqueteHttp = async (idEspacio: string, idContrato: string, idEstimacion: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/eliminaPaquete"}?idEspacio=${idEspacio}&idContrato=${idContrato}&idEstimacion=${idEstimacion}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const getListaEstimacionesDefinitivasPorContratistaHttp = async (id_contratista: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getListaEstimacionesDefinitivasPorContratista"}?id_contratista=${id_contratista}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getListaEstimacionesDefinitivasCreadasPorContratistaHttp = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getListaEstimacionesDefinitivasCreadasPorContratista"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaEstatusEstimacionHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/actualizaEstatusEstimacion"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getHistoricoEstimacionesConceptoHttp = async (id_contrato: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getHistoricoEstimacionesConcepto"}?id_contrato=${id_contrato} `
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getControlEstimacionesHttp = async (id_contrato: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getControlEstimaciones"}?id_contrato=${id_contrato} `
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const getDatosGenerarPaqueteHTTP = async (id_obra: number, fecha_inicio:string, fecha_fin:string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getDatosGenerarPaquete"}?id_obra=${id_obra}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}
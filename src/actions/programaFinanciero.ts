import axios from 'axios';
import env from "react-dotenv";


export const getProgramaFinancieroHTTP = async (id_contrato:string,id_concepto:string,id_frente:string,es_ajustado = 0): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getProgramaFinanciero"}?id_contrato=${id_contrato}&id_concepto=${id_concepto}&id_frente=${id_frente}&es_ajustado=${es_ajustado}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getProgramaGuardadoAdministracionHTTP = async (id_contrato:string,id_frente:string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getProgramaGuardadoAdministracion"}?id_contrato=${id_contrato}&id_frente=${id_frente}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const setProgramaFinancieroHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setProgramaFinanciero"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const editProgramaFinancieroHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/editProgramaFinanciero"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const eliminarProgramaHTTP = async (id:any): Promise<any> => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/eliminarPrograma"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const deleteProgramaFinancieroHTTP = async (id:any): Promise<any> => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/deleteProgramaFinanciero"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getProgramaFinancieroClasificacionHTTP = async (id_obra:string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getProgramaFinancieroClasificacion"}?id_obra=${id_obra}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const setProgramaFinancieroClasificacionHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setProgramaFinancieroClasificacion"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const editarProgramaHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/editarPrograma"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const aplicarProgramaHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/aplicarPrograma"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};





export const editProgramaFinancieroClasificacionHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/editProgramaFinancieroClasificacion"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const deleteProgramaFinancieroClasificacionHTTP = async (id:any): Promise<any> => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/deleteProgramaFinancieroClasificacion"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const addProgramaFinancieroGuardadoHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/addProgramaFinancieroGuardado"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getProgramasGuardadosHTTP = async (id_contrato:string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getProgramasGuardados"}?id_contrato=${id_contrato}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const recuperaProgramaHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/recuperaPrograma"}`,data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

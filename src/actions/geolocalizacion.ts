import axios from 'axios';
import env from "react-dotenv";

export const setGeoCercaHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setGeoCerca"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getGeocercasObraHttp = async (id_obra: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getGeocercasObra"}?id_obra=${id_obra}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};



export const deleteGeocercasObraHttp = async (id: any): Promise<any> => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/deleteGeocercasObra"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const setUsuerGeocercasHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setUsuerGeocercas"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const setUsuarioNoPertenecienteHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setUsuarioNoPerteneciente"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getUsuariosGeocercasProyectoHttp = async (espacio: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getUsuariosGeocercasProyecto"}?espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const eliminaUsuarioGeocercaHttp = async (id: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/eliminaUsuarioGeocerca"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getPositionsHttp = async (id_obra: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getPositions"}?id_obra=${id_obra}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

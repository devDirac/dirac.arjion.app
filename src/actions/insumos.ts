import axios from 'axios';
import env from "react-dotenv";

export const setInsumosHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setInsumos"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getInsumosHttp = async (espacio: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getInsumos"}?espacio=${espacio}`,
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const updateInsumosHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/updateInsumos"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const deleteInsumoHttp = async (id: any, espacio: any): Promise<any> => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/deleteInsumo"}?id=${id}&espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const setPrioridadsHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/setPrioridad"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const getOrigenDestinoHttp = async (espacio: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getOrigenDestino"}?espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const setOrigenDestinoHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setOrigenDestino"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const setEntradasHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setEntradas"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};


export const getEntradasHttp = async (espacio: any, insumo: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEntradas"}?espacio=${espacio}&id_insumo=${insumo}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const getSalidasHttp = async (espacio: any, insumo: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getSalidas"}?espacio=${espacio}&id_insumo=${insumo}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const setSalidasHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setSalidas"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const setPuntoReordenHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/setPuntoReorden"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;

  }
};

export const getEntradasObraHttp = async (espacio: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEntradasObra"}?espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getSalidasObraHttp = async (espacio: any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getSalidasObra"}?espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

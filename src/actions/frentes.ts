import axios from 'axios';
import env from "react-dotenv";


export const getFrentesByIdContratoHttp = async (id: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getFrentesByIdContrato"}?id=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getFrentesByIdObraHttp = async (id: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getFrentesByIdObra"}?id_obra=${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const guardaFrenteHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/guardaFrente"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaFrenteHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/actualizaFrente"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const actualizaEstatusHttp = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/actualizaEstatus"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const addMediaFrenteHttp = async (data: any): Promise<any> => {
  try {
      const response: any = await axios.post(
          `${env.API_URL}${"/addMediaFrente"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};

export const editMediaFrenteHttp = async (data: any): Promise<any> => {
  try {
      const response: any = await axios.put(
          `${env.API_URL}${"/editMediaFrente"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};

export const removeMediaFrenteHttp = async (id: any, espacio: any, contrato: any): Promise<any> => {
  try {
      const response: any = await axios.delete(
          `${env.API_URL}${"/removeMediaFrente"}?id=${id}&espacio=${espacio}&contrato=${contrato}`
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};



export const setNotasFrenteHttp = async (data: any): Promise<any> => {
  try {
      const response: any = await axios.post(
          `${env.API_URL}${"/setNotasFrente"}`, data
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};

export const editNotasFrenteHttp = async (data: any): Promise<any> => {
  try {
      const response: any = await axios.put(
          `${env.API_URL}${"/editNotasFrente"}`, data
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};

export const deleteNotasFrenteHttp = async (id: any): Promise<any> => {
  try {
      const response: any = await axios.delete(
          `${env.API_URL}${"/deleteNotasFrente"}?id=${id}`
      );
      return response?.data || [];
  } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
  }
};
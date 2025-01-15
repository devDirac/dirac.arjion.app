import axios from 'axios';
import env from "react-dotenv";

export const setValorProyetoHTTP = async (data:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setValorProyeto"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getValoresHTTP = async (id_obra:any): Promise<any> => {
    try {
      const response: any = await axios.get(
        `${env.API_URL}${"/getValores"}?id_obra=${id_obra}`
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
  };

  export const editValorProyetoHTTP = async (data:any): Promise<any> => {
    try {
      const response: any = await axios.put(
        `${env.API_URL}${"/editValorProyeto"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
  };


  
  export const deleteValoresConceptoHTTP = async (id:any): Promise<any> => {
    try {
      const response: any = await axios.delete(
        `${env.API_URL}${"/deleteValoresConcepto"}?id=${id}`
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
  };

  export const eliminarValorProyetoHTTP = async (id:any): Promise<any> => {
    try {
      const response: any = await axios.delete(
        `${env.API_URL}${"/eliminarValorProyeto"}?id=${id}`
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
  };

  
  

  export const setCatalogoValorProyetoHTTP = async (data:any): Promise<any> => {
    try {
      const response: any = await axios.post(
        `${env.API_URL}${"/setCatalogoValorProyeto"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
  };
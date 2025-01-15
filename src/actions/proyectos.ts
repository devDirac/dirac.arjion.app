import axios from 'axios';
import env from "react-dotenv";


export const getObrasConRelaciones = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getObrasConRelaciones"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getAllUserAsociacion = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getUsers"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const unSetAsociacion = async (data: any) => {
  try {
    const response: any = await axios.delete(
      `${env.API_URL}${"/unSetAsociacion"}?id_obra=${data?.id_obra}&usuarios=${data?.usuarios}`
    );
    return response;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const setAsociacion = async (data: any) => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setAsociacion"}`, data
    );
    return response;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getEspacioUtilizadoProyectoHTTP = async (espacio: any) => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEspacioUtilizadoProyecto"}?espacio=${espacio}`
    );
    return response;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getFotoProyectoHTTP = async (id_proyecto: any) => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getFotoProyecto"}?id_proyecto=${id_proyecto}`
    );
    return response;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

